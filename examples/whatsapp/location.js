const {WhatsappClient, WhatsappLocMessage, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

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
