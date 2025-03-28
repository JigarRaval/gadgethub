const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

const secretKey = generateSecretKey();
console.log('Generated JWT Secret Key:', secretKey);
