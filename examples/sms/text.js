const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_FROM_NUMBER, TO_NUMBER, POST_CALLBACK_URL, API_URL} = require("../../privateConst.js");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(SMS_FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello $(name)!";
smsMessage.correlationId = "corId123";
smsMessage.callbackUrl = new URL(POST_CALLBACK_URL);
smsMessage.callbackData = "id:123|title:testData";
smsMessage.addSubstitution("name", "Tester");

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });