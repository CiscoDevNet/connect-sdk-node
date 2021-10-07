const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.contentTemplateId = "tmpl12345";

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
