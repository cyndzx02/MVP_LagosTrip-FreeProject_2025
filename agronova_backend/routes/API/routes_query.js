const express = require('express');
const { generateToken } = require('./service');
const { CheckCard } = require('./CardVerification');
const { CreateInvoice } = require('./CreateInvoice');

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

user.post('/createInvoice', async(req, res) => {
    try {
        const data = req.body;
        console.log("Données reçues sur le serveur:", data); // <== Ajoute ceci

        const result = await CreateInvoice(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = user;
