Interswitch API Integration (Create Invoice)
============================================

1. Overview
===========

The Create Invoice API allows merchants to generate invoices for their customers. It is a POST request that accepts various parameters, including the customer's details, transaction amount, merchant codes, and other optional fields.

.. code-block:: bash

    https://qa.interswitchng.com/paymentgateway/api/v1/merchant/invoice/create

2. Authentication
=================

The API requires a Bearer Token for authentication. You must first generate a valid token before making requests.

Header Example:

.. code-block:: bash

    Authorization: Bearer <your_access_token>
    Content-Type: application/json

3. Request Parameters
=====================


.. list-table:: Invoice Create API Parameters
   :header-rows: 1
   :widths: 15 10 10 40 25

   * - **Parameter**
     - **Type**
     - **Required**
     - **Description**
     - **Example**
   * - amount
     - string
     - Yes
     - Transaction amount in minor currency (no decimals)
     - "250000" (NGN 2500.00)
   * - customerName
     - string
     - Yes
     - Full name of the customer
     - "Toyosi Oyelayo"
   * - customerEmail
     - string
     - Yes
     - Email address of the customer
     - "toyosi@nomail.com"
   * - description
     - string
     - No
     - Description of the invoice
     - "Invoice for service"
   * - merchantCode
     - string
     - Yes
     - Merchant code from Quickteller Business
     - "MX6072"
   * - payableCode
     - string
     - Yes
     - Payable code from Quickteller Business
     - "9405967"
   * - lineItems
     - array
     - Yes
     - List of invoice items (products/services)
     - "[{\"item\": \"Product A\", \"price\": \"50000\"}]"
   * - dueDate
     - string
     - Yes
     - Invoice due date (timestamp in milliseconds)
     - "2604188800000"
   * - discountPercent
     - string
     - No
     - Percentage discount on invoice
     - "5.5"
   * - shippingFee
     - string
     - No
     - Shipping fee
     - "70000"
   * - address
     - string
     - No
     - Customer's billing address
     - "123 Street, City"
   * - tax
     - string
     - No
     - Applicable tax information
     - "15"


4. Sample Request (cURL)
=========================

.. code-block:: bash

    curl -X POST "https://qa.interswitchng.com/paymentgateway/api/v1/merchant/invoice/create" \
        -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "amount": "250000",
            "customerName": "Toyosi Oyelayo",
            "customerEmail": "toyosi@nomail.com",
            "description": "Invoice for service",
            "merchantCode": "MX6072",
            "payableCode": "9405967",
            "lineItems": [
                {"item": "Product A", "price": "50000"},
                {"item": "Product B", "price": "20000"}
            ],
            "dueDate": "2604188800000",
            "discountPercent": "5.5",
            "shippingFee": "70000",
            "address": "123 Street Name, City, Country",
            "tax": "15"
        }'

5. Sample Request (Node.js - Axios)
====================================

.. code-block:: javascript

    const axios = require('axios');

    async function createInvoice() {
        const token = "YOUR_ACCESS_TOKEN"; // Replace with a valid token
        const url = "https://qa.interswitchng.com/paymentgateway/api/v1/merchant/invoice/create";

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        const data = {
            amount: "250000",
            customerName: "Toyosi Oyelayo",
            customerEmail: "toyosi@nomail.com",
            description: "Invoice for service",
            merchantCode: "MX6072",
            payableCode: "9405967",
            lineItems: [
                {"item": "Product A", "price": "50000"},
                {"item": "Product B", "price": "20000"}
            ],
            dueDate: "2604188800000",
            discountPercent: "5.5",
            shippingFee: "70000",
            address: "123 Street Name, City, Country",
            tax: "15"
        };

        try {
            const response = await axios.post(url, data, { headers });
            console.log("Invoice Created:", response.data);
        } catch (error) {
            console.error("Error Creating Invoice:", error.response ? error.response.data : error.message);
        }
    }

    createInvoice();

6. Response
===========

**Success Response (200 OK):**

.. code-block:: json

    {
        "status": "success",
        "message": "Invoice created successfully",
        "invoiceId": "INV123456789",
        "amount": "250000",
        "customerName": "Toyosi Oyelayo",
        "dueDate": "2604188800000"
    }

**Error Responses:**

*Invalid Token (401 Unauthorized):*

.. code-block:: json

    {
        "error": "invalid_token",
        "error_description": "Cannot convert access token to JSON"
    }

*Missing Required Field (400 Bad Request):*

.. code-block:: json

    {
        "code": "10400",
        "description": "Invalid data. Please verify all fields are in correct format",
        "logId": "ae307bfe-1a2e-4ae3-b6f4-c7bf397b8d2b",
        "errors": null
    }

7. Common Issues & Troubleshooting
====================================

8. Best Practices
=================

- Use a secure method to store and refresh the API token.
- Validate input data before sending requests.
- Implement error handling for all possible responses.
- Use timestamps correctly for dueDate (milliseconds format).
- Log request/response data for debugging.

9. Additional Resources
=======================

- Interswitch API Documentation
- Quickteller Business Dashboard
