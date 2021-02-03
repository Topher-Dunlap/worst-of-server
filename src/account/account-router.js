const express = require('express');
const xss = require('xss');
const AccountService = require('./account-service');
const {requireAuth} = require('../middleware/jwt-auth')
const AuthService = require('../auth/auth-service');
const jsonParser = express.json();
const accountRouter = express.Router();

accountRouter
    .route('/auth/login')
    .get((req, res, next) => {
        ///check if account exists
        AccountService.accountCheck(
            req.app.get('db'),
        )
            .then(account => {
                if (account) {
                    console.dir("user logged in")
                }
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {email, password} = req.body
        const loginUser = {email, password}

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.email
        )
            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect email or password',
                    })

                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect email or password',
                            })

                        const sub = dbUser.email
                        const payload = {user_id: dbUser.id}
                        res.send({
                            authToken: AuthService.createJwt(sub, payload),
                        })
                    })
            })
            .catch(next)
    })

accountRouter
    .route('/create')
    .post((req, res) => {
        res.send('ok')
    })


module.exports = accountRouter