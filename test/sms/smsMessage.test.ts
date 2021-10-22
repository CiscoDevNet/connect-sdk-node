import {SmsMessage, SmsContentType} from "../../src";
import {expect} from "chai";

describe("SmsMessage", () => {
    it("sets constructor values properly", () => {
        const smsMessage = new SmsMessage().of_text('12345', '+14443332222', 'hello');

        expect(smsMessage.from).to.equal('12345');
        expect(smsMessage.to).to.equal('+14443332222');
        expect(smsMessage.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const smsMessage = new SmsMessage().of_text('12345', '+14443332222', 'hello');

        expect(() => {
            new SmsMessage().of_text('12345', '', 'hello');
        }).to.throw();

        expect(() => {
            smsMessage.from = "";
        }).to.throw();

        expect(() => {
            smsMessage.from = "+14443332222"
        }).to.not.throw();

        expect(() => {
            smsMessage.to = "abc";
        }).to.throw();
        expect(() => {
            smsMessage.to = "+14443332222";
        }).to.not.throw();

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
    });

    it('detects content type automatically', () => {
        let smsMessage = new SmsMessage().of_text('12345', '+14443332222', 'hello world');

        expect(smsMessage.contentType).to.equal(SmsContentType.TEXT);

        smsMessage = new SmsMessage().of_binary('12345', '+14443332222', new Uint8Array(1024))

        expect(smsMessage.contentType).to.equal(SmsContentType.BINARY);

        smsMessage = new SmsMessage().of_template('12345', '+14443332222', 'tmpl12345');

        expect(smsMessage.contentType).to.equal(SmsContentType.TEMPLATE);

        smsMessage = new SmsMessage().of_unicode('12345', '+14443332222', 'Hello World 🗺️!');

        expect(smsMessage.contentType).to.equal(SmsContentType.UNICODE);
    });

    it('sets contentType correctly when template Id is specified', () => {
        const message = new SmsMessage().of_template('12345', '+13333223333', 'abc');

        expect(message.contentType).to.equal(SmsContentType.TEMPLATE);
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const smsMessage = new SmsMessage().of_text('12345', '+14443332222', 'hello');

        expect(() => {
            smsMessage.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            smsMessage.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(smsMessage.substitutions).to.deep.equal({"name": "tester"});
    });

    it("sets remaining values correctly", () => {
        const smsMessage = new SmsMessage().of_text('12345', '+14443332222', 'hello');
        smsMessage.correlationId = "corr123";
        smsMessage.dltTemplateId = "dlt123";
        smsMessage.callbackData = "cbdata123";

        expect(smsMessage.correlationId).to.equal("corr123");
        expect(smsMessage.dltTemplateId).to.equal("dlt123");
        expect(smsMessage.callbackData).to.equal("cbdata123");
        expect(smsMessage.idempotencyKey).to.not.be.null;
    });

    it('converts byte array to base64 correctly', () => {
        const data = new Uint8Array(5);
        data[0] = 1;
        data[1] = 2;
        data[2] = 3;
        data[3] = 4;
        data[4] = 5;

        const message = new SmsMessage().of_binary('12345', '+12223334444', data);

        expect(message.toJSON()).to.deep.equal({
            "content": "0102030405",
            "contentType": "BINARY",
            "from": "12345",
            "substitutions": {},
            "to": "+12223334444"
        });
    });

});