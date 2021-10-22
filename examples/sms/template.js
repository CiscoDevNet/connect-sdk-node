const {SmsClient, SmsMessage, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, SMS_FROM_NUMBER, TO_NUMBER, SMS_TEMPLATE_ID, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage().of_template(SMS_FROM_NUMBER, TO_NUMBER, SMS_TEMPLATE_ID);

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
