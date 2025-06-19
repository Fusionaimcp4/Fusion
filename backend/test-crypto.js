const { encrypt, decrypt } = require('./dist/utils/crypto.js');

console.log('Testing encryption/decryption...');

const testKey = 'sk-test-1234567890abcdef';
console.log('Original:', testKey);

try {
  const encrypted = encrypt(testKey);
  console.log('Encrypted:', encrypted);
  
  const decrypted = decrypt(encrypted);
  console.log('Decrypted:', decrypted);
  
  console.log('Match:', testKey === decrypted);
  
  if (testKey === decrypted) {
    console.log('✅ Encryption/Decryption test PASSED');
  } else {
    console.log('❌ Encryption/Decryption test FAILED');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
} 