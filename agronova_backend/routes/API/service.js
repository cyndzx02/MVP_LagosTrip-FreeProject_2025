const axios = require('axios');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
// let token = '';
const base = require('base-64');


async function generateToken() {
    const clientId = "IKIA72C65D005F93F30E573EFEAC04FA6DD9E4D344B1";
    const clientSecret = "YZMqZezsltpSPNb4+49PGeP7lYkzKn1a5SaVSyzKOiI=";
    const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

      }
}

module.exports = { generateToken };
