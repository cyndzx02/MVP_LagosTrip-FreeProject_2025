require('dotenv').config()
const express = require('express');
const data = require('./service');
const user = express.Router();

user.get('/access-token', data.generete_token);

module.exports = user;