import { useState } from 'react';

const PasswordCard = ({ password, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-card">
      <div className="password-info">
        <p><strong>WEBSITE:</strong> {password.website}</p>
        <p><strong>USERNAME:</strong> {password.username}</p>
        <p>
          <strong>PASSWORD:</strong> 
          {showPassword ? password.password : '******'}
          <button 
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </p>
      </div>
      <button 
        className="delete-button"
        onClick={onDelete}
        aria-label="Delete password"
      >
        ×
      </button>
    </div>
  );
};

export default PasswordCard;