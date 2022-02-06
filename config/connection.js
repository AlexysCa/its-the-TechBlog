const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDBURL
? new Sequelize(process.env.JAWSDBURL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
});

module.exports = sequelize;