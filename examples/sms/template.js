const {SmsClient, SmsMessage} = require('../../dist');

const smsClient = new SmsClient('f2d88f74-1966-11ec-a806-025578af612b');
const smsMessage = new SmsMessage("12019401281", "+15613172975");

smsMessage.contentTemplateId = "tmpl12345";
smsMessage.addSubstitution("name", "Tester");
smsMessage.addSubstitution("dept", "Testing");
smsMessage.correlationId = "correlation1234";
smsMessage.dltTemplateId = "dlt444";
smsMessage.callbackUrl = "https://my.website.com/callback";
smsMessage.callbackData = "customerID123|1234|new_sale";

console.log(smsMessage.toJSON());

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
