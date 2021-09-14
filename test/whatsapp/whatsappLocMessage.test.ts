import {WhatsappLocMessage, WhatsappContentType} from "../../src";
import {expect} from "chai";

describe("WhatsappImageMessage", () => {
    it("sets constructor values properly", () => {
        const message = new WhatsappLocMessage('12345', '+14443332222', 26.1, -26.1);

        expect(message.from).to.equal('12345');
        expect(message.to).to.equal('+14443332222');
        expect(message.latitude).to.equal(26.1);
        expect(message.longitude).to.equal(-26.1);
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const message = new WhatsappLocMessage('12345', '+14443332222', 26.1, -26.1);

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

        expect(() => {
            message.latitude = undefined;
        }).to.throw();
        expect(() => {
            message.latitude = -26.1;
        }).to.not.throw();

        expect(() => {
            message.longitude = undefined;
        }).to.throw();
        expect(() => {
            message.longitude = -26.1;
        }).to.not.throw();

        expect(message.contentType).to.equal(WhatsappContentType.LOCATION);

        expect(() => {
            message.callbackUrl = "http://invalidURL";
        }).to.throw();
        expect(() => {
            message.callbackUrl = "https://www.google.com";
        }).to.not.throw();
        expect(message.callbackUrl).to.equal("https://www.google.com");
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const message = new WhatsappLocMessage('12345', '+14443332222', 26.1, -26.1);

        expect(() => {
            message.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            message.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(message.substitutions).to.deep.equal([{"name": "tester"}]);
    });

    it("sets remaining values correctly", () => {
        const message = new WhatsappLocMessage('12345', '+14443332222', 26.1, -26.1);
        message.correlationId = "corr123";
        message.callbackData = "cbdata123";
        message.name = "test loc";
        message.address = "123 main st";

        expect(message.correlationId).to.equal("corr123");
        expect(message.callbackData).to.equal("cbdata123");
        expect(message.name).to.equal("test loc");
        expect(message.address).to.equal("123 main st");
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("toJSON returns properties correctly", () => {
        const message = new WhatsappLocMessage('12345', '+14443332222', 26.1, -26.1);
        message.callbackUrl = "http://www.google.com";
        message.callbackData = "abc|123";
        message.addSubstitution("key1", "value1");

        expect(message.toJSON()).to.deep.equal({
            "callbackData": "abc|123",
            "callbackUrl": "http://www.google.com",
            "contentType": "LOCATION",
            "from": "12345",
            "latitude": 26.1,
            "longitude": -26.1,
            "substitutions": [
                {
                    "key1": "value1"
                }
            ],
            "to": "+14443332222"
        });
    });

});