import crypto from 'node:crypto';

const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const encodeBase62 = (length = 7) => {
  const bytes = crypto.randomBytes(length);

  let shortCode = "";

  for (let i = 0; i < bytes.length; i++) {
    shortCode += BASE62[bytes[i] % BASE62.length];
  }

  return shortCode;
};