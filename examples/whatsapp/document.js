const {WhatsappClient, WhatsappDocMessage} = require('../../dist');

const whatsAppClient = new WhatsappClient('bearer test: 1234');

const whatsAppMessage = new WhatsappDocMessage("+14443332222", "+14443332222", "http://my.website.com/document.doc", "application/msword");
whatsAppMessage.caption = "My document";
whatsAppMessage.fileName = "document.doc";
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
