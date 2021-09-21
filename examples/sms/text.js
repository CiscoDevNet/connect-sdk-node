const {SmsClient, SmsMessage} = require('../../dist');

const smsClient = new SmsClient('f2d88f74-1966-11ec-a806-025578af612b');
const smsMessage = new SmsMessage("12019401281", "+15613172975");
smsMessage.content = "Hello World!";

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
