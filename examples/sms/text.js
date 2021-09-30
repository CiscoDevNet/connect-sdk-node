const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst.js");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL("https://www.google.com"));
clientConfiguration.sandboxed();

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello $(name)!";
smsMessage.addSubstitution("name", "Tester");

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });