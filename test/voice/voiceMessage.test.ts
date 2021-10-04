import {VoiceMessage, UrlAudio} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("VoiceMessage", () => {

    it("sets constructor values properly", () => {
        const voiceMsg = new VoiceMessage('+14443334444');

        expect(voiceMsg.callerId).to.equal('+14443334444');
        expect(voiceMsg.idempotencyKey).to.not.equal("");
    });

    it("detects invalid property values", () => {
        const voiceMsg = new VoiceMessage('+14443332222');
        const audio = new UrlAudio('http://www.mysite.com/audio.mp3');

        expect(() => {
            // @ts-ignore
            voiceMsg.callerId = undefined;
        }).to.throw();

        expect(() => {
            voiceMsg.audio = undefined;
        }).to.throw();

        expect(() => {
            voiceMsg.audio = audio;
        }).to.not.throw();

        expect(() => {
            voiceMsg.callerId = "";
        }).to.throw();

        expect(() => {
            voiceMsg.callbackUrl = "htttp:www.goog";
        }).to.throw();

        expect(() => {
            voiceMsg.callbackUrl = "http://www.google.com"
        }).to.not.throw();
    });

    it('sets values properly', () => {
        const voiceMsg = new VoiceMessage('+14443332222');
        const audio = new UrlAudio('http://www.mysite.com/audio.mp3');

        voiceMsg.callerId = "12345";
        voiceMsg.audio = audio;

        expect(() => {
            voiceMsg.dialedNumber = "abc";
        }).to.throw();

        voiceMsg.dialedNumber = "+13332223333";
        voiceMsg.callbackUrl = "http://www.google.com";
        voiceMsg.correlationId = "corl1234";

        expect(voiceMsg.callerId).to.equal("12345");
        expect(voiceMsg.dialedNumber).to.deep.equal("+13332223333");
        expect(voiceMsg.audio).to.deep.equal(audio);
        expect(voiceMsg.callbackUrl).to.equal("http://www.google.com");
        expect(voiceMsg.correlationId).to.equal("corl1234");
    });

    it("toJSON returns properties correctly", () => {
        const voiceMsg = new VoiceMessage('+14443332222');
        const audio = new UrlAudio('http://www.mysite.com/audio.mp3');

        voiceMsg.dialedNumber = "+12229993333";
        voiceMsg.audio = audio;

        expect(voiceMsg.toJSON()).to.deep.equal({
            "audio": {
                "location": "http://www.mysite.com/audio.mp3",
                "type": "URL"
            },
            "callerId": "+14443332222",
            "dialedNumber": "+12229993333"
        });
    });

});