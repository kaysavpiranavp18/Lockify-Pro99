import CryptoJS from 'crypto-js';

// Hash master password for storage
// utils/crypto.js
export const hashMasterPassword = async (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const encrypt = (data, password) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
};

export const decrypt = (ciphertext, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (e) {
    return null;
  }
};