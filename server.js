const path = require('path');
const express = require('express');
const routes = require('./controllers');
const utilDate = require('./utils/date')

const sequelize = require('./config/connection')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

