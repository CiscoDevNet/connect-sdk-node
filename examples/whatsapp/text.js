const {WhatsappClient, WhatsappTextMessage} = require('../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);
const whatsAppMessage = new WhatsappTextMessage(FROM_NUMBER, TO_NUMBER, "Hello World!");
const response = whatsAppClient.sendMessage(whatsAppMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
