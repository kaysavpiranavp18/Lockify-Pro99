import { useState } from 'react';

const ChangeMasterPassword = ({ onCancel, onChange }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Check if new password is different
    if (oldPassword === newPassword) {
      setError('New password must be different');
      return;
    }

    // 2. Verify new passwords match
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // 3. Check password strength
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // 4. Call parent handler to change password
    const success = await onChange(oldPassword, newPassword);
    if (!success) {
      setError('Current password is incorrect');
    }
  };

  return (
    <div className="change-password-form">
      <h3>Change Master Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="gold-button">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeMasterPassword;