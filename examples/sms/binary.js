const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst.js");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const data = new Uint8Array(5);
data[0] = 72;
data[1] = 101;
data[2] = 108;
data[3] = 108;
data[4] = 111;

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const smsClient = new SmsClient(clientConfiguration);
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