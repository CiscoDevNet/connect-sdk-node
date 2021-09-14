import {WhatsappContactMessage, WhatsappContentType} from "../../src";
import {expect} from "chai";
import {WhatsappContact} from "../../src";

describe("WhatsappAudioMessage", () => {
    it("sets constructor values properly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');

        expect(message.from).to.equal('12345');
        expect(message.to).to.equal('+14443332222');
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');

        expect(() => {
            message.from = "abc";
        }).to.throw();
        expect(() => {
            message.from = "12345";
        }).to.not.throw();

        expect(() => {
            message.to = "abc";
        }).to.throw();
        expect(() => {
            message.to = "+14443332222";
        }).to.not.throw();

        expect(message.contentType).to.equal(WhatsappContentType.CONTACTS);

        expect(() => {
            message.callbackUrl = "http://invalidURL";
        }).to.throw();
        expect(() => {
            message.callbackUrl = "https://www.google.com";
        }).to.not.throw();
        expect(message.callbackUrl).to.equal("https://www.google.com");
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');

        expect(() => {
            message.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            message.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(message.substitutions).to.deep.equal([{"name": "tester"}]);
    });

    it("sets remaining values correctly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');
        message.correlationId = "corr123";
        message.callbackData = "cbdata123";

        expect(message.correlationId).to.equal("corr123");
        expect(message.callbackData).to.equal("cbdata123");
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("adds contacts correctly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');
        const contact = new WhatsappContact();
        contact.formattedName = "John Snow Smith";
        contact.namePrefix = "Mr.";
        contact.firstName = "John";

        // @ts-ignore
        message.addContact(contact);

        expect(message.contacts).to.deep.equal([
            {
                _formattedName: 'John Snow Smith',
                _namePrefix: 'Mr.',
                _firstName: 'John'
            }
        ])
    })

    it("toJSON returns properties correctly", () => {
        const message = new WhatsappContactMessage('12345', '+14443332222');
        message.callbackUrl = "http://www.google.com";
        message.callbackData = "abc|123";
        message.addSubstitution("key1", "value1");

        expect(message.toJSON()).to.deep.equal({
            contacts: [],
            from: '12345',
            to: '+14443332222',
            contentType: 'CONTACTS',
            callbackUrl: 'http://www.google.com',
            callbackData: 'abc|123',
            substitutions: [ { key1: 'value1' } ]
        });
    });

});