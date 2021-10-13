const {WhatsappClient, WhatsappTextMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const request = whatsAppClient.getStatus('476daca0-843f-447b-8512-259731f91080');

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
