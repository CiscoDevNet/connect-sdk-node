const {WhatsappClient, WhatsappStickerMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_STICKER_FILE} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

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
