const express = require('express');
const xss = require('xss');
const AccountService = require('./account-service');
const {requireAuth} = require('../middleware/basic-auth');
const AuthService = require('../auth/auth-service');
const jsonParser = express.json();
const accountRouter = express.Router();

// accountRouter
//     .route('/create')
//     .all(requireAuth)
//     .get((req, res, next) => {
//         ///check if account already exists
//         AccountService.accountCheck(
//             req.app.get('db'),
//         )
//             .then(accounts => {
//                 res.json(accounts)
//             })
//             .catch(next)
//     })
//     .post(jsonParser, (req, res, next) => {
//
//         const {user_name, password} = req.body
//         const newAccount = {user_name, password}
//
//         for (const [key, value] of Object.entries(newAccount))
//             if (value == null)
//                 return res.status(400).json({
//                     error: {message: `Missing '${key}' in request body`}
//                 })
//
//         AccountService.insertAccount(
//             req.app.get('db'),
//             newAccount
//         )
//             .then(note => {
//                 res
//                     .status(201)
//                     .location(`/notes/${note.id}`)
//                 console.dir("account created")
//                 // res.json({
//                 //     id: note.id,
//                 //     name: xss(note.name), // sanitize name
//                 //     content: xss(note.content), // sanitize content
//                 //     folder_id: note.folder_id
//                 // })
//             })
//             .catch(next)
//     })
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
        console.dir("inside /auth/login POST: ", loginUser)

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
                        error: 'Incorrect user_name or password',
                    })
                    const sub = dbUser.email
                    const payload = { user_id: dbUser.id }
                    res.send({
                          authToken: AuthService.createJwt(sub, payload),
                    })
            })
            .catch(next)
    })

module.exports = accountRouter