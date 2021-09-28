const {WhatsappClient, WhatsappStickerMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);
const whatsAppMessage = new WhatsappStickerMessage(FROM_NUMBER, TO_NUMBER, "http://my.website.com/sticker.png", "image/webp");

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
