const axios = require('axios');
const { generateToken } = require('./service');

async function DoAccountNameInquiry(accountDetails) {
    const accessToken = await generateToken();
    if (!accessToken) throw new Error("Impossible d'obtenir un access token.");

    const terminalId = '3PBL0001';
    const bankCode = accountDetails.bankCode;  
    const accountId = accountDetails.accountId;

    const url = 'https://qa.interswitchng.com/quicktellerservice/api/v5/transactions/DoAccountNameInquiry';

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'TerminalId': terminalId,
        'bankCode': bankCode,
        'accountId': accountId
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
}

async function CheckCard(req, res) {
    try {
        const cardDetails = req.body;
        const accessToken = await generateToken();
        console.log("TOKEN:", accessToken);
        
        const result = await DoAccountNameInquiry(cardDetails);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { CheckCard };
