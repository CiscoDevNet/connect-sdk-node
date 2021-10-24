const {WhatsappClient,
    WhatsappTemplateMessage,
    ClientConfiguration,
    TemplateSubstitution, MediaHeader} = require('connect-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID, API_URL, WA_DOC_MEDIAHEADER} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTemplateMessage(WHATSAPP_FROM, TO_NUMBER, WA_TEMPLATE_ID);

const textSub = new TemplateSubstitution("variable1")
    .of_text("Hello World");

whatsAppMessage.addSubstitution(textSub);

const mediaHeader = new MediaHeader("DOCUMENT", WA_DOC_MEDIAHEADER, "sample_flight_ticket_1627294682290091.pdf")
whatsAppMessage.mediaHeader = mediaHeader;

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });