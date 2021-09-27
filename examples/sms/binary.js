const {SmsClient, SmsMessage} = require('../../dist');

const data = new Uint8Array(5);
data[0] = 1;
data[1] = 2;
data[2] = 3;
data[3] = 4;
data[4] = 5;

const smsClient = new SmsClient('f2d88f74-1966-11ec-a806-025578af612b');
const smsMessage = new SmsMessage("12019401281", "+15613172975");

smsMessage.binaryContent = data;

console.log(smsMessage.toJSON());

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });