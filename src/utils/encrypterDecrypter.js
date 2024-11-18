const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error encrypting password:', error);
        throw error;
    }
}

module.exports.encryptPassword = encryptPassword;

async function decryptPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error decrypting password:', error);
        throw error;
    }
}

module.exports.decryptPassword = decryptPassword;