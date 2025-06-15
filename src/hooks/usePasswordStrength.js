import { useState, useEffect } from 'react';

const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState('weak');

  useEffect(() => {
    if (!password) return;

    let strengthValue = 0;
    
    // Length check
    if (password.length >= 8) strengthValue += 1;
    if (password.length >= 12) strengthValue += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strengthValue += 1;
    if (/[0-9]/.test(password)) strengthValue += 1;
    if (/[^A-Za-z0-9]/.test(password)) strengthValue += 1;
    
    // Determine strength level
    if (strengthValue >= 5) setStrength('strong');
    else if (strengthValue >= 3) setStrength('medium');
    else setStrength('weak');
  }, [password]);

  return strength;
};

export default usePasswordStrength;