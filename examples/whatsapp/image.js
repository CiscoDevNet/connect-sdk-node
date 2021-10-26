const {WhatsappClient, WhatsappImageMessage, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_IMAGE_FILE, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);

const whatsAppMessage = new WhatsappImageMessage(WHATSAPP_FROM, TO_NUMBER, WA_IMAGE_FILE, "image/png");
whatsAppMessage.caption = "My image";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
