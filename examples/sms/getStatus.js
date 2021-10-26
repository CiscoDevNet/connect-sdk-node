const {SmsClient, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, SMS_MESSAGE_ID, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new SmsClient(clientConfiguration);
const request = client.getStatus(SMS_MESSAGE_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })