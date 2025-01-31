const express = require('express');
const router = express.Router();
const { fundTransfer } = require('./fundTransfer');

router.post('/transfer', async (req, res) => {
    try {
        const transferDetails = req.body;
        const result = await fundTransfer(transferDetails);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
