const {WhatsappClient, WhatsappLocMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);

const whatsAppMessage = new WhatsappLocMessage(WHATSAPP_FROM, TO_NUMBER, 28.372395561985662, -81.50942795589746);
whatsAppMessage.name = "Unknown Location";
whatsAppMessage.address = "123 main street";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
