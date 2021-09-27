const {SmsClient, SmsMessage} = require('../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const smsClient = new SmsClient(AUTH_TOKEN);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello World 🗺️!";

console.log(smsMessage.toJSON());

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
