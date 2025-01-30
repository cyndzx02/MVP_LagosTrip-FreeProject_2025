require('dotenv').config()
const fs = require('fs');
const {checkEmail, checkPassword, checkEmailExists, LoginUser, authToken} = require('./middleware/auth');
const db = require('./config/db');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
const body = require('body-parser');
const mysql = require('mysql2');
const Roads = require('./routes/auth/auth');
const {generete_token} = require('./routes/API/service');
const user = require('./routes/API/routes_query');

app.use(cors());

app.use(body.urlencoded({extended: false}));
app.use(body.json());

app.post('/info', (req, res) => {
    res.send("Hello World");
    console.log("Hello guys, I need some chocolate");
});

// app.use(api);
app.use(user);
// generete_token

app.listen(port, () => {
    console.log('Agronova app successfully listening at http://localhost:' + port);
});
