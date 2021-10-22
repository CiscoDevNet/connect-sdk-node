const {WhatsappClient,
    WhatsappTemplateMessage,
    ClientConfiguration,
    TemplateSubstitution,
    MediaHeader,
    TemplateHeaderTypes} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID, POST_CALLBACK_URL, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTemplateMessage(WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID);
whatsAppMessage.callbackData = "customerID123|1234|new_sale";
whatsAppMessage.callbackUrl = POST_CALLBACK_URL;
whatsAppMessage.correlationId = "de36bb32-3f5d-46c9-b132-15e010a80ccc";

const currSub = new TemplateSubstitution("newCurr")
    .of_currency('USD', '100', 'currFallback');

whatsAppMessage.addSubstitution(currSub);

const dateSub = new TemplateSubstitution("newDate")
    .of_datetime('2015-10-04', 'dateFallback');

whatsAppMessage.addSubstitution(dateSub);

whatsAppMessage.addQuickReply("Button text 1", "pay123");
whatsAppMessage.addQuickReply("Button text 2");
whatsAppMessage.addQuickReply("Button text 3", "pay789");

const mediaHeader = new MediaHeader(TemplateHeaderTypes.IMAGE, "http://mywebsite.com/image.png", "image.png");
whatsAppMessage.mediaHeader = mediaHeader;

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });