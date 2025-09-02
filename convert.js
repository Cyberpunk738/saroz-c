// convert.js
const bs58 = require('bs58');

// Replace the string below with your Phantom private key (keep the quotes)
const secretKeyBase58 = 'UJmTaQRuRNn2oG7FwoYnPgKMiu5kqcXWefoukUvSXFhRBSpd4uahmEvoGD5h824UaBryudF7L3v1Bi5kgiD5aL4';

// For bs58 v6+, use bs58.default.decode
const secretKeyUint8 = bs58.default.decode(secretKeyBase58);

console.log(JSON.stringify(Array.from(secretKeyUint8)));