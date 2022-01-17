# Vue, Node, Express, Sequelize, PostgreSQL and Vuetify
> This application uses: Vue 2, NodeJS, Express, Sequelize, PostGreSQL and Vuetify.
QMS (Quote Managment System) that allows to create quotes and commissioning sheets, track product and manage the projects.

## Usage
* It is necessary
    * Install PostgreSQL
    * Configuration of the PostgreSQL database [backend/server/config/config.json]
#### 

## Installation
Database:

```sh
 username: postgres
 password: postgres
 database: qms_dev
```

Backend:

```sh
cd server
npm install
# npm i uuid --save
```

Frontend:

```sh
cd client
npm install
```
## Install Sequelize
npm install --save sequelize

## Development setup

To run the application, it is necessary to have running the backend and frontend app

```sh
cd server
npm start
sequelize db:seed:all
```


```sh
cd client
npm run dev
http://localhost:8081
```

## Release History

* 0.0.1
    * Work in progress

## Meta

Alex Ustinov – alex@auco.co.nz

See ``MIT LICENSE`` for more information.

[https://github.com/

