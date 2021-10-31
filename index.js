const safeCompare = require('safe-compare')
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const md5 = require("apache-md5");
const crypt = require("apache-crypt");

module.exports = class HtpasswdValidator {
    verifyUsername(inputUsername, username) {
        return safeCompare(inputUsername, username)
    }

    verifyPassword(inputPassword, passwordHash) {
        if (passwordHash.substr(0, 5) === '{SHA}') {
            const c = crypto.createHash('sha1');
            c.update(inputPassword);
            return safeCompare(c.digest('base64'), passwordHash.substr(5))
        }

        if (passwordHash.substr(0, 4) === '$2y$' || passwordHash.substr(0, 4) === '$2a$') {
            return bcrypt.compareSync(inputPassword, passwordHash)
        }

        if (passwordHash.substr(0, 6) === '$apr1$' || passwordHash.substr(0, 3) === '$1$') {
            return safeCompare(md5(inputPassword, passwordHash), passwordHash)
        }

        if (/^[a-zA-Z0-9]{13}$/.test(passwordHash)) {
            return safeCompare(crypt(inputPassword, passwordHash), passwordHash)
        }

        return safeCompare(inputPassword, passwordHash)
    }

    verifyCredentials(inputUsername, inputPassword, userpassHash) {
        const [username, ...passwordHashParts] = userpassHash.split(':')

        return this.verifyUsername(inputUsername, username) & this.verifyPassword(inputPassword, passwordHashParts.join(':'))
    }
}
