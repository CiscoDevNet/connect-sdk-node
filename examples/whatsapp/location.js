const {WhatsappClient, WhatsappLocMessage} = require('../../dist');

//const {WhatsappDocClient, WhatsappDocMessage} = require('cpaas-sdk-node')

const whatsAppClient = new WhatsappClient('bearer test: 1234');

const whatsAppMessage = new WhatsappLocMessage("+14443332222", "+14443332222", 28.372395561985662, -81.50942795589746);
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
whatsAppMessage.name = "Unknown Location";
whatsAppMessage.address = "123 main street";
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
