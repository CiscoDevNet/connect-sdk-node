const {WhatsappClient, WhatsappStickerMessage, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_STICKER_FILE, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappStickerMessage(WHATSAPP_FROM, TO_NUMBER, WA_STICKER_FILE, "image/webp");

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
