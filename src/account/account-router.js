const express = require('express');
const xss = require('xss');
const AccountService = require('./account-service');
const { requireAuth } = require('../middleware/basic-auth')
const jsonParser = express.json();

const accountRouter = express.Router();

accountRouter
    .route('/create')
    .all(requireAuth)
    .get((req, res, next) => {
        ///check if account already exists
        AccountService.accountCheck(
            req.app.get('db'),
        )
            .then(accounts => {
                res.json(accounts)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {

        const {user_name, password} = req.body
        const newAccount = {user_name, password}

        for (const [key, value] of Object.entries(newAccount))
            if (value == null)
                return res.status(400).json({
                    error: {message: `Missing '${key}' in request body`}
                })

        AccountService.insertAccount(
            req.app.get('db'),
            newAccount
        )
            .then(note => {
                res
                    .status(201)
                    .location(`/notes/${note.id}`)
                console.dir("account created")
                // res.json({
                //     id: note.id,
                //     name: xss(note.name), // sanitize name
                //     content: xss(note.content), // sanitize content
                //     folder_id: note.folder_id
                // })
            })
            .catch(next)
    })
accountRouter
    .route('/login')
    .get((req, res, next) => {
        ///check if account exists
        AccountService.accountCheck(
            req.app.get('db'),
        )
            .then(account => {
                if(account) {
                    console.dir("user logged in")
                }
            })
            .catch(next)
    })

module.exports = accountRouter