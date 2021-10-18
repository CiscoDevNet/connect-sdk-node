import {
    WhatsappContactEmail,
    WhatsappContactUrl,
    WhatsappContactAddr,
    WhatsappContactPhone,
    PhoneType,
    AddressType,
    EmailType,
    UrlType,
    WhatsappContact
} from "../../src";
import {expect} from "chai";

describe("WhatsappContact", () => {
    it("throws validation errors correctly", () => {
        const contact = new WhatsappContact();

        expect(() => {
            contact.birthday = "abc";
        }).to.throw();
        expect(() => {
            contact.birthday = "2015-10-21T14:24:33.000Z";
        }).to.not.throw();
    });

    it("sets remaining values correctly", () => {
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

        expect(contact.formattedName).to.equal("John Snow Smith");
        expect(contact.namePrefix).to.equal("Mr.");
        expect(contact.firstName).to.equal("John");
        expect(contact.middleName).to.equal("Snow");
        expect(contact.lastName).to.equal("Smith");
        expect(contact.nameSuffix).to.equal("Sr.");
        expect(contact.birthday).to.equal("2015-10-21");
        expect(contact.company).to.equal("ABC Corp");
        expect(contact.department).to.equal("Testing");
        expect(contact.title).to.equal("Tester");
    });

    it('sets birthday correctly for both string and date', () => {
        const contact = new WhatsappContact();

        contact.birthday = "2015-10-21T14:24:33.000Z";

        expect(contact.birthday).to.equal('2015-10-21');

        contact.birthday = new Date('2015-10-21T14:24:33.000Z');

        expect(contact.birthday).to.equal('2015-10-21');

        contact.birthday = new Date('2015-09-05T14:24:33.000Z');

        expect(contact.birthday).to.equal('2015-09-05');

        expect(() => {
            contact.birthday = "abc";
        }).to.throw();

        contact.birthday = undefined;

        expect(contact.birthday).to.be.undefined;
    })

    it("adds phone object correctly", () => {
        const contact = new WhatsappContact();
        const phone = new WhatsappContactPhone();
        phone.type = PhoneType.HOME;
        phone.number = "+13334440000";
        phone.whatsAppId = "30403";

        expect(() => {
            // @ts-ignore
            contact.addPhone()
        }).to.throw();

        // @ts-ignore
        contact.addPhone(phone);

        expect(contact.toJSON()).to.deep.equal({
            phones: [ { type: 'HOME', number: '+13334440000', whatsAppId: '30403' } ],
            addresses: [],
            emails: [],
            urls: []
        });
    })

    it("adds address object correctly", () => {
        const contact = new WhatsappContact();
        const address = new WhatsappContactAddr();
        address.type = AddressType.HOME;
        address.city = "Beverly Hills";

        expect(() => {
            // @ts-ignore
            contact.addAddress()
        }).to.throw();

        // @ts-ignore
        contact.addAddress(address);

        expect(contact.toJSON()).to.deep.equal({
            "addresses": [
                {
                    "city": "Beverly Hills",
                    "type": "HOME"
                }
            ],
            "phones": [],
            "emails": [],
            "urls": []
        });
    })

    it("adds email object correctly", () => {
        const contact = new WhatsappContact();
        const email = new WhatsappContactEmail();
        email.type = EmailType.HOME;
        email.address = "someone@somewhere.com";

        expect(() => {
            // @ts-ignore
            contact.addEmail()
        }).to.throw();

        // @ts-ignore
        contact.addEmail(email);

        expect(contact.toJSON()).to.deep.equal({
            "emails": [
                {
                    "address": "someone@somewhere.com",
                    "type": "HOME"
                }
            ],
            "phones": [],
            "addresses": [],
            "urls": []
        });
    })

    it("adds url object correctly", () => {
        const contact = new WhatsappContact();
        const url = new WhatsappContactUrl();
        url.type = UrlType.HOME;
        url.address = "http://www.google.com";

        expect(() => {
            // @ts-ignore
            contact.addUrl()
        }).to.throw();

        // @ts-ignore
        contact.addUrl(url);

        expect(contact.toJSON()).to.deep.equal({
            "urls": [
                {
                    "address": "http://www.google.com",
                    "type": "HOME"
                }
            ],
            "phones": [],
            "addresses": [],
            "emails": []
        });
    })

    it("toJSON returns properties correctly", () => {
        const contact = new WhatsappContact();
        contact.formattedName = "John Snow Smith";
        contact.namePrefix = "Mr.";
        contact.firstName = "John";
        contact.middleName = "Snow";
        contact.lastName = "Smith";
        contact.title = "Tester";

        expect(contact.toJSON()).to.deep.equal({
            formattedName: 'John Snow Smith',
            namePrefix: 'Mr.',
            firstName: 'John',
            middleName: 'Snow',
            lastName: 'Smith',
            title: 'Tester',
            phones: [],
            addresses: [],
            emails: [],
            urls: []
        });

    });

});