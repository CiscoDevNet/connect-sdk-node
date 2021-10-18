const {
    WhatsappClient,
    WhatsappContactMessage,
    WhatsappContact,
    PhoneType,
    AddressType,
    EmailType,
    UrlType,
    WhatsappContactPhone,
    WhatsappContactAddr,
    WhatsappContactEmail,
    WhatsappContactUrl, ClientConfiguration
} = require('cpaas-sdk-node');
const {AUTH_TOKEN, WHATSAPP_FROM, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappContactMessage(WHATSAPP_FROM, TO_NUMBER);

const contact = new WhatsappContact();
contact.formattedName = "John Snow Smith";


contact.namePrefix = "Mr.";
contact.firstName = "John";
contact.middleName = "Snow";
contact.lastName = "Smith";
contact.nameSuffix = "Sr.";
contact.birthday = "2015-09-21";
contact.company = "ABC Corp";
contact.department = "Testing";
contact.title = "Tester";

const phone = new WhatsappContactPhone();
phone.type = PhoneType.HOME;
phone.number = "+12223334444";
phone.whatsAppId = "a_12345";

contact.addPhone(phone);

const phoneB = new WhatsappContactPhone();
phoneB.type = PhoneType.WORK;
phoneB.number = "+13334440001";

contact.addPhone(phoneB);

const address = new WhatsappContactAddr();
address.type = AddressType.WORK;
address.street = "123 Main Street";
address.city = "Beverly Hills";
address.state = "CA";
address.zip = 90210;
address.country = "United States";
address.countryCode = "US";

contact.addAddress(address);

const addressB = new WhatsappContactAddr();
addressB.type = AddressType.HOME;
addressB.street = "124 Main Street";
addressB.city = "Beverly Hills";
addressB.state = "CA";
addressB.zip = 90210;
addressB.country = "United States";
addressB.countryCode = "US";

contact.addAddress(addressB);

const email = new WhatsappContactEmail();
email.type = EmailType.WORK;
email.address = "noone@nowhere.com";

contact.addEmail(email);

const emailB = new WhatsappContactEmail();
emailB.type = EmailType.HOME;
emailB.address = "noone2@nowhere.com";

contact.addEmail(emailB);

const url = new WhatsappContactUrl();
url.type = UrlType.HOME;
url.address = "http://www.nowhere.com";

contact.addUrl(url);

const urlB = new WhatsappContactUrl();
urlB.type = UrlType.HOME;
urlB.address = "http://www.nowhere.com";

contact.addUrl(urlB);

whatsAppMessage.addContact(contact);

const request = whatsAppClient.sendMessage(whatsAppMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });