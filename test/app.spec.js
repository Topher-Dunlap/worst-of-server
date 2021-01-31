const app = require('../src/app')
// const {expect} = require('chai');
const supertest = require('supertest');

describe('App', () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello, world!')
    })
})

describe('Search Endpoint', () => {
    it('GET / responds with 200', () => {
        return supertest(app)
            .get('/api/search?location=des moines, ia&term=coffee&limit=1&offset=0')
            .expect(200)
    })
})

