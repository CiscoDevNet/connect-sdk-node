import {VoiceCall} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("VoiceCall", () => {

    it("sets constructor values properly", () => {
        const voiceCall = new VoiceCall('+14443334444');

        expect(voiceCall.callerId).to.equal('+14443334444');
        expect(voiceCall.idempotencyKey).to.not.equal("");
    });

    it("detects invalid property values", () => {
        const voiceCall = new VoiceCall('+14443332222');

        expect(() => {
            // @ts-ignore
            voiceCall.callerId = undefined;
        }).to.throw();

        expect(() => {
            voiceCall.callerId = "";
        }).to.throw();

        expect(() => {
            voiceCall.callbackUrl = "htttp:www.goog";
        }).to.throw();

        expect(() => {
            voiceCall.callbackUrl = "http://www.google.com"
        }).to.not.throw();

        expect(() => {
            // @ts-ignore
            voiceCall.recordCallSeconds = "abc";
        }).to.throw();

        expect(() => {
            voiceCall.recordCallSeconds = 123;
        }).to.not.throw();

        expect(() => {
            // @ts-ignore
            voiceCall.detectVoiceMail = "abc";
        }).to.throw();

        expect(() => {
            voiceCall.detectVoiceMail = true;
        }).to.not.throw();
    });

    it('sets values properly', () => {
        const voiceCall = new VoiceCall('+14443332222');

        voiceCall.callerId = "12345";

        expect(() => {
            voiceCall.dialedNumber = "abc";
        }).to.throw();

        voiceCall.dialedNumber = "+13332223333";
        voiceCall.callbackUrl = "http://www.google.com";
        voiceCall.recordCallSeconds = 23;
        voiceCall.detectVoiceMail = true;
        voiceCall.correlationId = "corl1234";

        expect(voiceCall.callerId).to.equal("12345");
        expect(voiceCall.dialedNumber).to.deep.equal("+13332223333");
        expect(voiceCall.callbackUrl).to.equal("http://www.google.com");
        expect(voiceCall.recordCallSeconds).to.equal(23);
        expect(voiceCall.detectVoiceMail).to.be.true;
        expect(voiceCall.correlationId).to.equal("corl1234");
    });

    it("toJSON returns properties correctly", () => {
        const voiceCall = new VoiceCall('+14443332222');

        voiceCall.dialedNumber = "+12229993333";

        expect(voiceCall.toJSON()).to.deep.equal({
            "callerId": "+14443332222",
            "detectVoiceMail": false,
            "dialedNumber": "+12229993333"
        });
    });

});