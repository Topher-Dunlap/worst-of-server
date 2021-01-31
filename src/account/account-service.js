const axios = require('axios');

const AccountService = {

    getAllAccounts(knex) {
        return knex.select('*').from('worst_of_users')
    },

    insertAccount(knex, newFolder) {
        return knex
            .insert(newFolder)
            .into('worst_of_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    accountCheck(knex, id) {return knex.from('worst_of_users').select('*').where('id', id).first()
    },
}

module.exports = AccountService