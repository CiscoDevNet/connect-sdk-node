const {WhatsappClient, WhatsappLocMessage} = require('../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

const whatsAppMessage = new WhatsappLocMessage(FROM_NUMBER, TO_NUMBER, 28.372395561985662, -81.50942795589746);
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
whatsAppMessage.name = "Unknown Location";
whatsAppMessage.address = "123 main street";
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";

console.log(whatsAppMessage.toJSON());

const response = whatsAppClient.sendMessage(whatsAppMessage);

response
    .then(res => {
        console.log(res);

        const statusReq = whatsAppClient.getStatus(res.messageId);

        statusReq
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })

    })
    .catch(err => {
        console.error(err);
    });
