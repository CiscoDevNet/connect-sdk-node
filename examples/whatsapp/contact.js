const {WhatsappClient, WhatsappContactMessage, WhatsappContact, PhoneType, AddressType, EmailType, UrlType} = require('../../dist');
const {WhatsappContactPhone} = require("../../dist/api/whatsapp/contacts/whatsappContactPhone");
const {WhatsappContactAddr} = require("../../dist/api/whatsapp/contacts/whatsappContactAddr");
const {WhatsappContactEmail} = require("../../dist/api/whatsapp/contacts/whatsappContactEmail");
const {WhatsappContactUrl} = require("../../dist/api/whatsapp/contacts/whatsappContactUrl");


const whatsAppClient = new WhatsappClient('bearer test: 1234');

const whatsAppMessage = new WhatsappContactMessage("+14443332222", "+14443332222");
whatsAppMessage.addSubstitution("name", "Tester");
whatsAppMessage.addSubstitution("dept", "Testing");
whatsAppMessage.correlationId = "correlation1234";
whatsAppMessage.callbackUrl = "https://my.website.com/callback";
whatsAppMessage.callbackData = "customerID123|1234|new_sale";

const contact = new WhatsappContact();
contact.formattedName = "John Snow Smith";
contact.namePrefix = "Mr.";
contact.firstName = "John";
contact.middleName = "Snow";
contact.lastName = "Smith";
contact.nameSuffix = "Sr.";
contact.birthday = "2015-10-21T14:24:33.000Z";
contact.company = "ABC Corp";
contact.department = "Testing";
contact.title = "Tester";

const phone = new WhatsappContactPhone();
phone.type = PhoneType.HOME;
phone.number = "+13334440000";
phone.whatsAppId = "30403";

contact.addPhone(phone);

const address = new WhatsappContactAddr();
address.type = AddressType.WORK;
address.street = "123 Main Street";
address.city = "Beverly Hills";
address.state = "CA";
address.zip = 90210;
address.country = "United States";
address.countryCode = "US";

contact.addAddress(address);

const email = new WhatsappContactEmail();
email.type = EmailType.WORK;
email.address = "noone@nowhere.com";

contact.addEmail(email);

const url = new WhatsappContactUrl();
url.type = UrlType.HOME;
url.address = "http://www.nowhere.com";

contact.addUrl(url);

whatsAppMessage.addContact(contact);

//console.log(whatsAppMessage.toJSON());

const response = whatsAppClient.sendMessage(whatsAppMessage);

response
    .then(res => {
        console.log(res);

        const statusReq = whatsAppClient.getStatus(res.messageId);

        statusReq
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })

    })
    .catch(err => {
        console.error(err);
    });