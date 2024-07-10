const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const secretKey = crypto.randomBytes(78).toString('hex');
console.log('Generated secret key:', secretKey);

const configFilePath = path.join(__dirname, 'next.config.mjs');
const configContent = fs.readFileSync(configFilePath, 'utf-8');

const updatedConfigContent = configContent.replace(/('ACCESS_SECRET_CODE':\s*')[^']*(')/, `$1${secretKey}$2`);

fs.writeFileSync(configFilePath, updatedConfigContent);
console.log(`Secret key saved to ${configFilePath}`);