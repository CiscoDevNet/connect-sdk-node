const {WhatsappClient, WhatsappTemplateMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTemplateMessage(WHATSAPP_FROM, TO_NUMBER, '224633232914434');
whatsAppMessage.callbackData = "customerID123|1234|new_sale";
whatsAppMessage.callbackUrl = "https://webhook.site/50a33cb4-ab23-4a65-aa91-15d39b34826f";
whatsAppMessage.correlationId = "de36bb32-3f5d-46c9-b132-15e010a80ccc";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });