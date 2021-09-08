const {SmsClient, SmsMessage, ContentType} = require('../dist/index');

//const {SmsClient, SmsMessage} = require('npm-library-publish-test')

const smsClient = new SmsClient('bearer test: 1234');

const smsMessage = new SmsMessage();
smsMessage.from = "+14443332222";
smsMessage.to = "+14443332222";
smsMessage.content = "Hello World!";
smsMessage.contentType = ContentType.TEXT;
smsMessage.addSubstitution("name", "Tester");
smsMessage.addSubstitution("dept", "Testing");
smsMessage.correlationId = "correlation1234";
smsMessage.dltTemplateId = "dlt444";
smsMessage.callbackUrl = "https://my.website.com/callback";
smsMessage.callbackData = "customerID123|1234|new_sale";
smsMessage.expireAt = "2021-08-01T14:24:33.000Z";

const request = smsClient.sendMessage(smsMessage);

request
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
