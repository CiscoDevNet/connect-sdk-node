import {WhatsappAudioMessage, WhatsappContentType} from "../../src";
import {expect} from "chai";

describe("WhatsappAudioMessage", () => {
    it("sets constructor values properly", () => {
        const message = new WhatsappAudioMessage('12345', '+14443332222', 'http://www.site.com/test.wav', 'audio/wav');

        expect(message.from).to.equal('12345');
        expect(message.to).to.equal('+14443332222');
        expect(message.url).to.equal('http://www.site.com/test.wav');
        expect(message.mimeType).to.equal('audio/wav');
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const message = new WhatsappAudioMessage('12345', '+14443332222', 'http://www.site.com/test.wav', 'audio/wav');

        expect(() => {
            message.to = "abc";
        }).to.throw();
        expect(() => {
            message.to = "+14443332222";
        }).to.not.throw();

        expect(() => {
            message.url = "htttp://www.google.com";
        }).to.throw();
        expect(() => {
            message.url = "http://www.google.com";
        }).to.not.throw();

        expect(() => {
            message.mimeType = "";
        }).to.throw();
        expect(() => {
            message.mimeType = "audio/wav";
        }).to.not.throw();

        expect(message.contentType).to.equal(WhatsappContentType.AUDIO);

        expect(() => {
            message.callbackUrl = "http://invalidURL";
        }).to.throw();
        expect(() => {
            message.callbackUrl = "https://www.google.com";
        }).to.not.throw();
        expect(message.callbackUrl).to.equal("https://www.google.com");
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const message = new WhatsappAudioMessage('12345', '+14443332222', 'http://www.site.com/test.wav', 'audio/wav');

        expect(() => {
            message.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            message.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(message.substitutions).to.deep.equal([{"name": "tester"}]);
    });

    it("sets remaining values correctly", () => {
        const message = new WhatsappAudioMessage('12345', '+14443332222', 'http://www.site.com/test.wav', 'audio/wav');
        message.correlationId = "corr123";
        message.callbackData = "cbdata123";

        expect(message.correlationId).to.equal("corr123");
        expect(message.callbackData).to.equal("cbdata123");
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("toJSON returns properties correctly", () => {
        const message = new WhatsappAudioMessage('12345', '+14443332222', 'http://www.site.com/test.wav', 'audio/wav');
        message.callbackUrl = "http://www.google.com";
        message.callbackData = "abc|123";
        message.addSubstitution("key1", "value1");

        expect(message.toJSON()).to.deep.equal({
            contentType: 'AUDIO',
            url: 'http://www.site.com/test.wav',
            mimeType: 'audio/wav',
            from: '12345',
            to: '+14443332222',
            callbackUrl: 'http://www.google.com',
            callbackData: 'abc|123',
            substitutions: [ { key1: 'value1' } ]
        });
    });

});