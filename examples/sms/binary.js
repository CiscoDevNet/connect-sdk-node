const {SmsClient, SmsMessage} = require('../../dist');

const data = new Uint8Array(1024);

const smsClient = new SmsClient('bearer test: 1234');

const smsMessage = new SmsMessage("+14443332222", "+14443332222");
smsMessage.content = data;

console.log(smsMessage.toJSON());

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
