const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

class Helpers {
    // Hashing the password
    hashPassword = async (password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    };

    // Verifying the password
    verifyPassword = async (password, hashedPassword) => {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new Helpers