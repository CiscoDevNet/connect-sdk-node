const {WhatsappClient, WhatsappTemplateMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);
const whatsAppMessage = new WhatsappTemplateMessage(FROM_NUMBER, TO_NUMBER);
whatsAppMessage.templateId = "tmpl4432";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });