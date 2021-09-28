const {WhatsappClient, WhatsappDocMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

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
