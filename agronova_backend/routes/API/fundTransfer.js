const axios = require('axios');
const { generateToken } = require('./service');

function generateTransferCode() {
    const timestamp = Date.now(); 
    const randomPart = Math.floor(Math.random() * 1000000); 
    return `${timestamp}${randomPart}`;
}

module.exports = {
    fundTransfer
};
