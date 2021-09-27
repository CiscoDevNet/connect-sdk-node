const {WhatsappClient, WhatsappLocMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

const whatsAppMessage = new WhatsappLocMessage(FROM_NUMBER, TO_NUMBER, 28.372395561985662, -81.50942795589746);
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
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
