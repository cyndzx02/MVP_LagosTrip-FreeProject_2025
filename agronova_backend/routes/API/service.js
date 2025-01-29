const axios = require('axios');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
// let token = '';
const base = require('base-64');

function generete_token() {
    const auth = 'Basic' + base64.encode(`${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`);
    const body = {
        method: 'GET',
        headers: {
            // accept: 'application/json',
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = fetch('https://passport.k8.isw.la/passport/oauth/token?grant_type=client_credentials', body)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    } catch (error) {
        console.error('Error:', error.message)
    }
}

module.exports.generete_token = generete_token;