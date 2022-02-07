const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../utils/authenticate');


module.exports = router;
