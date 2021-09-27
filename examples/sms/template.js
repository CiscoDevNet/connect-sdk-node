const {SmsClient, SmsMessage} = require('../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const smsClient = new SmsClient(AUTH_TOKEN);
const smsMessage = new SmsMessage(FROM_NUMBER, TO_NUMBER);

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
