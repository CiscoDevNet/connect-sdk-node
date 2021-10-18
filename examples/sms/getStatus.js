const {SmsClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_MESSAGE_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new SmsClient(clientConfiguration);
const request = client.getStatus('717f338f-da5f-4693-b1a4-b26dd2f639e5')

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })