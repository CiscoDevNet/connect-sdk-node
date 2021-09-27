const {SmsClient, SmsMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const smsClient = new SmsClient(AUTH_TOKEN);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello World 🗺️!";

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
