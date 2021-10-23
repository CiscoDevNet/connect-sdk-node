const {WhatsappClient,
    WhatsappTemplateMessage,
    ClientConfiguration,
    TemplateSubstitution} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTemplateMessage(WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID);

const textSub = new TemplateSubstitution("newText")
    .of_text("Hello World");

whatsAppMessage.addSubstitution(textSub);

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });