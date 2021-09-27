const {WhatsappClient, WhatsappVideoMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

const whatsAppMessage = new WhatsappVideoMessage(FROM_NUMBER, TO_NUMBER, "http://my.website.com/video.mp4", "video/mp4");
whatsAppMessage.caption = "My video";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
