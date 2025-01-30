const express = require('express');
const { generateToken } = require('./service');
const { CheckCard } = require('./CardVerification');

const user = express.Router();

user.get('/access-token', async (req, res) => {
    try {
        const token = await generateToken();
        if (!token) {
            return res.status(500).json({ error: "Impossible de générer un token" });
        }
        res.json({ access_token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

user.get('/check-card', CheckCard);


module.exports = user;
