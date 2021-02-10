
# Worst-Of API Docs

## Open Endpoints

Open endpoints require no Authentication.

* [Login](login.md) : `POST /api/account/auth/login/`
* [Create Account](create.md) : `POST /api/account/create/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Yelp related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Request Results From Yelp](yelp.md) : `GET /api/searchForm/search?*`

## Built With
* Node.js
* Express
* Express Router
* Postgres
* SQL
* Knex
* Postgrator
* Jest
* JWT
* Service Objects
* Morgan


## Features

* Express Router
* Unit and Integration testing
* JWT authentication 
* Multiple REST API calls


## Authors

* **Topher Dunlap** - ** - Design, server development/testing, styling, deployment and iteration.

