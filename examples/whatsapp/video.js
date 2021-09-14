const {WhatsappClient, WhatsappVideoMessage} = require('../../dist');

//const {WhatsappDocClient, WhatsappDocMessage} = require('cpaas-sdk-node')

const whatsAppClient = new WhatsappClient('bearer test: 1234');

const whatsAppMessage = new WhatsappVideoMessage("+14443332222", "+14443332222", "http://my.website.com/video.mp4", "video/mp4");
whatsAppMessage.caption = "My video";
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");

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
