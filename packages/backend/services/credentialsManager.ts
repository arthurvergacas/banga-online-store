import crypto from 'crypto';

function encryptPassword(password: string) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedValue = hash.digest('hex');
  return hashedValue;
}

export default { encryptPassword };