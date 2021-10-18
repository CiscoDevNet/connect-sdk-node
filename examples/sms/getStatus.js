const {SmsClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_MESSAGE_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new SmsClient(clientConfiguration);
const request = client.getStatus(SMS_MESSAGE_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })