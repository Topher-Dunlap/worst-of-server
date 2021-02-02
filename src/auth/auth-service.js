const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {

    getUserWithUserName(db, name) {
        return db('worst_of_users')
            .where({name})
            .first()
    },

    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },

    createJwt(subject, payload) {
      return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
          })
    },

    parseBasicToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':')
    },
}

module.exports = AuthService