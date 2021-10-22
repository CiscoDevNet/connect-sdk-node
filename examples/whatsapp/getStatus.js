const {WhatsappClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WA_MESSAGE_ID, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const request = whatsAppClient.getStatus(WA_MESSAGE_ID);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
