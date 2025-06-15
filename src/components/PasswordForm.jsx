import { useState } from 'react';
import usePasswordStrength from '../hooks/usePasswordStrength';

const PasswordForm = ({ onSubmit }) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = usePasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ website, username, password });
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  const getStrengthColor = () => {
    if (strength === 'strong') return 'green';
    if (strength === 'medium') return 'gold';
    return 'red';
  };

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <h3>Add New Password</h3>
      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {password && (
          <p style={{ color: getStrengthColor(), marginTop: '5px' }}>
            Strength: {strength}
          </p>
        )}
      </div>
      <button type="submit" className="gold-button">
        Add Password
      </button>
    </form>
  );
};

export default PasswordForm;