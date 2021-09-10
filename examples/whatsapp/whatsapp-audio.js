const {WhatsappAudioClient, WhatsappAudioMessage} = require('../../dist');

//const {WhatsappAudioClient, WhatsappAudioMessage} = require('cpaas-sdk-node')

const whatsAppClient = new WhatsappAudioClient('bearer test: 1234');

const whatsAppMessage = new WhatsappAudioMessage("+14443332222", "+14443332222", "http://my.website.com/audio.wav", "audio/wav");
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
