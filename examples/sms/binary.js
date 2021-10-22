const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_FROM_NUMBER, TO_NUMBER, API_URL} = require("../../privateConst.js");

const data = new Uint8Array(5);
data[0] = 72;
data[1] = 101;
data[2] = 108;
data[3] = 108;
data[4] = 111;

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage().of_binary(SMS_FROM_NUMBER, TO_NUMBER, data);

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });