import { useState, useEffect } from 'react';
import { encrypt, decrypt, hashMasterPassword } from './utils/crypto';
import { getPasswords, savePasswords, getMasterPasswordHash, saveMasterPasswordHash } from './utils/storage';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import PasswordForm from './components/PasswordForm';
import PasswordCard from './components/PasswordCard';
import ChangeMasterPassword from './components/ChangeMasterPassword';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const storedHash = getMasterPasswordHash();
    setIsFirstTime(!storedHash);
  }, []);

  const handleLogin = async (password) => {
    const hashedPassword = await hashMasterPassword(password);
    const storedHash = getMasterPasswordHash();

    if (!storedHash) {
      // First time setup
      saveMasterPasswordHash(hashedPassword);
      setMasterPassword(password);
      setIsAuthenticated(true);
      setIsFirstTime(false);
      return true;
    } else if (hashedPassword === storedHash) {
      setMasterPassword(password);
      loadPasswords(password);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const loadPasswords = (password) => {
    const encryptedPasswords = getPasswords();
    if (encryptedPasswords) {
      const decrypted = decrypt(encryptedPasswords, password);
      setPasswords(decrypted || []);
    }
  };

  const handleAddPassword = (newPassword) => {
    const updatedPasswords = [...passwords, newPassword];
    setPasswords(updatedPasswords);
    savePasswords(encrypt(updatedPasswords, masterPassword));
  };

  const handleDeletePassword = (index) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(updatedPasswords);
    savePasswords(encrypt(updatedPasswords, masterPassword));
  };

  const handleChangeMasterPassword = async (oldPassword, newPassword) => {
    try {
      // Verify old password
      const storedHash = getMasterPasswordHash();
      const oldPasswordHash = await hashMasterPassword(oldPassword);
      if (oldPasswordHash !== storedHash) {
        alert('Current password is incorrect');
        return false;
      }

      // Re-encrypt all passwords with the new key
      const encryptedPasswords = encrypt(passwords, newPassword);

      // Update storage
      const newHash = await hashMasterPassword(newPassword);
      saveMasterPasswordHash(newHash);
      savePasswords(encryptedPasswords);

      // Update state
      setMasterPassword(newPassword);
      setShowChangePassword(false);

      alert('Master password changed successfully!');
      return true;
    } catch (error) {
      console.error('Password change failed:', error);
      alert('Failed to change password. Please try again.');
      return false;
    }
  };

  const handleLogout = () => {
    setMasterPassword('');
    setIsAuthenticated(false);
    setPasswords([]);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar 
        onLogout={handleLogout} 
        onChangePassword={() => setShowChangePassword(true)} 
      />
      
      <main className="main-content">
        {showChangePassword ? (
          <ChangeMasterPassword 
            onCancel={() => setShowChangePassword(false)}
            onChange={handleChangeMasterPassword}
          />
        ) : (
          <>
            <PasswordForm onSubmit={handleAddPassword} />
            <div className="passwords-list">
              {passwords.map((pw, index) => (
                <PasswordCard 
                  key={index}
                  password={pw}
                  onDelete={() => handleDeletePassword(index)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;