
const {Sequelize} = require('sequelize')
const config = require('config.json')
const { user, password, database } = config.database;

const db = new Sequelize(database, user, password,{
    dialect:'mysql'
})

module.exports = db