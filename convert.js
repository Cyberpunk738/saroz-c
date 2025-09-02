// convert.js
const bs58 = require('bs58');

// Replace the string below with your Phantom private key (keep the quotes)
const secretKeyBase58 ='SECRET_API_KEY';

// For bs58 v6+, use bs58.default.decode
const secretKeyUint8 = bs58.default.decode(secretKeyBase58);

console.log(JSON.stringify(Array.from(secretKeyUint8)));
