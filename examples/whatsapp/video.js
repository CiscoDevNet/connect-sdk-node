const {WhatsappClient, WhatsappVideoMessage, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_VIDEO_FILE, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);

const whatsAppMessage = new WhatsappVideoMessage(WHATSAPP_FROM, TO_NUMBER, WA_VIDEO_FILE, "video/mp4");
whatsAppMessage.caption = "My video";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
