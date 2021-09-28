const {SmsClient, SmsMessage} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst.js");

const data = new Uint8Array(5);
data[0] = 72;
data[1] = 101;
data[2] = 108;
data[3] = 108;
data[4] = 111;

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