const {SmsClient, SmsMessage} = require('../../dist');

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const hour = today.getHours();
let min = today.getMinutes();

if(min < 10) {
    min = "0" + min;
}

today = `${mm}/${dd}/${yyyy} ${hour}:${min}`;

const smsClient = new SmsClient('f2d88f74-1966-11ec-a806-025578af612b');
const smsMessage = new SmsMessage("12019401281", "+15613172975");

smsMessage.content = "Hello $(name), today is $(date)!";
smsMessage.addSubstitution("name", "Tester");
smsMessage.addSubstitution("date", today);
smsMessage.correlationId = "test1234";

console.log(smsMessage.toJSON());

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
