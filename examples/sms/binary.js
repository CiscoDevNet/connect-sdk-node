const {SmsClient, SmsMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst.js");

const data = new Uint8Array(5);
data[0] = 1;
data[1] = 2;
data[2] = 3;
data[3] = 4;
data[4] = 5;

const smsClient = new SmsClient(AUTH_TOKEN);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.binaryContent = data;

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });