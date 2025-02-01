const axios = require('axios');
const {generateToken} = require('./service');

async function CreateInvoice(params) {
    try {
        const token = await generateToken();
        if (!token) throw new Error("Impossible to have a new token");

        const url = 'https://qa.interswitchng.com/paymentgateway/api/v1/merchant/invoice/create';
        const headers = {
            accept: 'application/json',
            "Authorization": `Bearer ${token}`,
            'Content-type': 'application/json'
        };

        const body = {
            amount: params.amount,
            customerName: params.customerName,
            customerEmail: params.customerEmail,
            merchantCode: params.merchantCode,
            payableCode: params.payableCode,
            dueDate: params.dueDate,
            discountPercent: params.discountPercent,
            shippingFee: params.shippingFee,
            address: params.address
        };

        const response = await axios.post(url, body, {headers});
        return response.data;
    } catch (error) {
        console.error("Error occurs when we want to create the invoice :", error.response ? error.response.data : error.message);
    }
}

module.exports = {
    CreateInvoice,
};
