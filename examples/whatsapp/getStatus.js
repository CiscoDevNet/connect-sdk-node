const {WhatsappClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WA_MESSAGE_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const request = whatsAppClient.getStatus(WA_MESSAGE_ID);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
