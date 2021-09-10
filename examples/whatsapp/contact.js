const {WhatsappContactClient, WhatsappContactMessage} = require('../../dist');

const whatsAppClient = new WhatsappContactClient('bearer test: 1234');

const whatsAppMessage = new WhatsappContactMessage("+14443332222", "+14443332222");
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
whatsAppMessage.previewUrl = "https://my.website.com/preview";
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";

console.log(whatsAppMessage);

const response = whatsAppClient.sendMessage(whatsAppMessage);

response
    .then(res => {
        console.log(JSON.parse(res));

        const statusReq = whatsAppClient.getStatus(JSON.parse(res).messageId);

        statusReq
            .then(res => {
                console.log(JSON.parse(res));
            })
            .catch(err => {
                console.error(err);
            })

    })
    .catch(err => {
        console.error(err);
    });
