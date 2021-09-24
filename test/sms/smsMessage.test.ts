import {SmsMessage, SmsContentType} from "../../src";
import {expect} from "chai";
import {SMS_CONTENT_MAXLEN} from "../../src/config/constants";

describe("SmsMessage", () => {
    it("sets constructor values properly", () => {
        const smsMessage = new SmsMessage('12345', '+14443332222');

        expect(smsMessage.from).to.equal('12345');
        expect(smsMessage.to).to.equal('+14443332222');
        expect(smsMessage.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const smsMessage = new SmsMessage('12345', '+14443332222');

        expect(() => {
            smsMessage.to = "abc";
        }).to.throw();
        expect(() => {
            smsMessage.to = "+14443332222";
        }).to.not.throw();

        let longContent = "";

        for(let i = 0; i <= SMS_CONTENT_MAXLEN + 100; i++) {
            longContent += "a";
        }

        expect(() => {
            smsMessage.content = longContent;
        }).to.throw();
        expect(() => {
            smsMessage.content = "Hello World";
        }).to.not.throw();

        expect(smsMessage.contentType).to.equal(SmsContentType.TEXT);

        expect(() => {
            smsMessage.callbackUrl = "http://invalidURL";
        }).to.throw();
        expect(() => {
            smsMessage.callbackUrl = "https://www.google.com";
        }).to.not.throw();
        expect(smsMessage.callbackUrl).to.equal("https://www.google.com");

        expect(() => {
            smsMessage.expireAt = "2021-08-01T14:24:33.asdf";
        }).to.throw();
        expect(() => {
            smsMessage.expireAt = "2021-08-01T14:24:33.000Z";
        }).to.not.throw();

        expect(smsMessage.expireAt).to.equal("2021-08-01T14:24:33.000Z");
    });

    it('detects content type automatically', () => {
        const smsMessage = new SmsMessage('12345', '+14443332222');

        smsMessage.content = "hello world";
        expect(smsMessage.contentType).to.equal(SmsContentType.TEXT);

        smsMessage.content = new Uint8Array(1024);
        expect(smsMessage.contentType).to.equal(SmsContentType.BINARY);

        smsMessage.contentTemplateId = "tmpl12345";
        expect(smsMessage.contentType).to.equal(SmsContentType.TEMPLATE);

        smsMessage.contentTemplateId = "";
        expect(smsMessage.contentType).to.equal(SmsContentType.TEXT);

        smsMessage.content = "Hello World 🗺️!";
        expect(smsMessage.contentType).to.equal(SmsContentType.UNICODE);
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const smsMessage = new SmsMessage('12345', '+14443332222');

        expect(() => {
            smsMessage.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            smsMessage.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(smsMessage.substitutions).to.deep.equal([{"name": "tester"}]);
    });

    it("sets remaining values correctly", () => {
        const smsMessage = new SmsMessage('12345', '+14443332222');
        smsMessage.correlationId = "corr123";
        smsMessage.dltTemplateId = "dlt123";
        smsMessage.callbackData = "cbdata123";

        expect(smsMessage.correlationId).to.equal("corr123");
        expect(smsMessage.dltTemplateId).to.equal("dlt123");
        expect(smsMessage.callbackData).to.equal("cbdata123");
        expect(smsMessage.idempotencyKey).to.not.be.null;
    });

});