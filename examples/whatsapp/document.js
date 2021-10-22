const {WhatsappClient, WhatsappDocMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_DOC_FILE, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);

const whatsAppMessage = new WhatsappDocMessage(WHATSAPP_FROM, TO_NUMBER, WA_DOC_FILE, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
whatsAppMessage.caption = "My document";
whatsAppMessage.fileName = "document.doc";

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
