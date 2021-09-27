const {WhatsappClient, WhatsappTextMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);
const whatsAppMessage = new WhatsappTextMessage(FROM_NUMBER, TO_NUMBER, "Hello World!");
const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
