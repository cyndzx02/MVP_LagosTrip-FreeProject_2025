const axios = require('axios');
const { generateToken } = require('./service');

function generateTransferCode() {
    const timestamp = Date.now(); 
    const randomPart = Math.floor(Math.random() * 1000000); 
    return `${timestamp}${randomPart}`;
}

async function fundTransfer(transferDetails) {
    try {
        const token = await generateToken();
        const url = "https://qa.interswitchng.com/quicktellerservice/api/v5/transactions/TransferFunds";

        const headers = {
            "Authorization": `Bearer ${token}`,
            "TerminalID": "3PBL",
            "Content-Type": "application/json"
        };

        const body = {
            transferCode: generateTransferCode(),
            mac: transferDetails.mac,
            termination: transferDetails.termination,
            sender: transferDetails.sender,
            initiatingEntityCode: transferDetails.initiatingEntityCode,
            initiation: transferDetails.initiation,
            beneficiary: transferDetails.beneficiary
        };

        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error("Erreur lors du transfert :", error.response ? error.response.data : error.message);
        throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
}

module.exports = {
    fundTransfer
};
