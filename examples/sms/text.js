const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst.js");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello $(name)!";
smsMessage.correlationId = "corId123";
smsMessage.callbackUrl = new URL("http://www.google.com");
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