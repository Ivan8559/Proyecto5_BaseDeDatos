const crypto = require('crypto')

const salt = process.env.SALT

const hashPassword = (password) => {
    return crypto.pbkdf2Sync(password,salt,10000,512,'sha512' ).toString('hex')

}

module.exports= hashPassword