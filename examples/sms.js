const {SmsClient, SmsMessage, ContentType} = require('../dist/index');

//const {SmsClient, SmsMessage} = require('cpaas-sdk-node')

const smsClient = new SmsClient('bearer test: 1234');

const smsMessage = new SmsMessage("+14443332222", "+14443332222");
smsMessage.content = "Hello World!";
smsMessage.contentType = ContentType.TEXT;
smsMessage.addSubstitution("name", "Tester");
smsMessage.addSubstitution("dept", "Testing");
smsMessage.correlationId = "correlation1234";
smsMessage.dltTemplateId = "dlt444";
smsMessage.callbackUrl = "https://my.website.com/callback";
smsMessage.callbackData = "customerID123|1234|new_sale";
smsMessage.expireAt = "2021-08-01T14:24:33.000Z";

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);

        const statusReq = smsClient.getStatus(res.messageId);

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
