const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_FROM_NUMBER, TO_NUMBER, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(SMS_FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello World 🗺️!";

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
