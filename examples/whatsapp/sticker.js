const {WhatsappClient, WhatsappStickerMessage} = require('../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);

const whatsAppMessage = new WhatsappStickerMessage(FROM_NUMBER, TO_NUMBER, "http://my.website.com/sticker.png", "image/webp");
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");

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
