import { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onLogin(password);
    if (!success) {
      setError('Incorrect password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card centered-auth">
        <h2>{isRegistering ? 'Create Master Password' : 'Enter Master Password'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Master Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="gold-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        {!isRegistering && (
          <p className="toggle-auth">
            First time user?{' '}
            <button 
              className="text-button" 
              onClick={() => setIsRegistering(true)}
            >
              Create master password
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;