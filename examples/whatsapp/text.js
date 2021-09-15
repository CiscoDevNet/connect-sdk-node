const {WhatsappClient, WhatsappTextMessage} = require('../../dist');

const whatsAppClient = new WhatsappClient('bearer test: 1234');

const whatsAppMessage = new WhatsappTextMessage("+14443332222", "+14443332222", "Hello World!");
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
whatsAppMessage.previewUrl = false;
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";

console.log(whatsAppMessage.toJSON());

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
