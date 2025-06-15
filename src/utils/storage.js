const MASTER_PASSWORD_HASH_KEY = 'masterPasswordHash';
const PASSWORDS_KEY = 'encryptedPasswords';

export const getMasterPasswordHash = () => {
  return localStorage.getItem(MASTER_PASSWORD_HASH_KEY);
};

export const saveMasterPasswordHash = (hash) => {
  localStorage.setItem(MASTER_PASSWORD_HASH_KEY, hash);
};

export const getPasswords = () => {
  return localStorage.getItem(PASSWORDS_KEY);
};

export const savePasswords = (encryptedPasswords) => {
  localStorage.setItem(PASSWORDS_KEY, encryptedPasswords);
};