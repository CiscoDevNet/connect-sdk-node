const {WhatsappClient, WhatsappTextMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, POST_CALLBACK_URL, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTextMessage(WHATSAPP_FROM, TO_NUMBER, "Hello $(name)!");
whatsAppMessage.callbackUrl = POST_CALLBACK_URL;
whatsAppMessage.callbackData = "id:123|title:testData";
whatsAppMessage.correlationId = "corlId123";

whatsAppMessage.addSubstitution("name", "tester");

const request = whatsAppClient.sendMessage(whatsAppMessage);


request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
