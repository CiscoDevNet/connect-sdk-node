const {SmsClient} = require('cpaas-sdk-node');
const {AUTH_TOKEN, SMS_MESSAGE_ID} = require("../../privateConst");

const client = new SmsClient(AUTH_TOKEN);
const request = client.getStatus(SMS_MESSAGE_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })