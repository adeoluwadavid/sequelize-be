
const {Sequelize} = require('sequelize')
const mysql = require('mysql2/promise');
const config = require('config.json')
const { host, port, user, password, database } = config.database;

// module.exports = db = {}
// initialize()
// async function initialize(){
//     const { host, port, user, password, database } = config.database;
//     const connection = await mysql.createConnection({host, port, user, password})
//     await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//     const sequelize = new Sequelize(database, user, password,{
//         dialect:'mysql'
//     })
//     db.User = require('../users/user.model')(sequelize);
//     db.Jobs = require('../users/user.job')(sequelize);
//     await sequelize.sync()
// }

const db = new Sequelize(database, user, password,{
    dialect:'mysql'
})

module.exports = db