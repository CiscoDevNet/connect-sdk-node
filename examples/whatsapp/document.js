const {WhatsappClient, WhatsappDocMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_SANDBOX_URL));

const whatsAppClient = new WhatsappClient(clientConfiguration);

const whatsAppMessage = new WhatsappDocMessage(FROM_NUMBER, TO_NUMBER, "http://my.website.com/document.doc", "application/msword");
whatsAppMessage.caption = "My document";
whatsAppMessage.fileName = "document.doc";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
