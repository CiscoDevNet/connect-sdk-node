const {WhatsappClient, WhatsappImageMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

const whatsAppMessage = new WhatsappImageMessage(FROM_NUMBER, TO_NUMBER, "http://my.website.com/image.png", "image/png");
whatsAppMessage.caption = "My image";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
