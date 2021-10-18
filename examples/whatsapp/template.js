const {WhatsappClient, WhatsappTemplateMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID, POST_CALLBACK_URL} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTemplateMessage(WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID);
whatsAppMessage.callbackData = "customerID123|1234|new_sale";
whatsAppMessage.callbackUrl = POST_CALLBACK_URL;
whatsAppMessage.correlationId = "de36bb32-3f5d-46c9-b132-15e010a80ccc";

whatsAppMessage.addSubstitution("variable1", "Tester");

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });