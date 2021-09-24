import {PatchAction} from '../../../src/api/voice/callbackResponses/patchAction';
import {actionTypes} from "../../../src/api/voice/callbackResponses/actionTypes";
import {expect} from "chai";
import {UrlAudio} from "../../../src";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("PatchAction", () => {
    it('sets dialedNumber correctly when supplied in constructor or set manually', () => {
        expect(() => {
            // @ts-ignore
            let action = new PatchAction();
        }).to.throw();

        expect(() => {
            let action = new PatchAction('test reason');
        }).to.throw();

        const action = new PatchAction('+15554443333');

        expect(action.dialedNumber).to.equal('+15554443333');

        expect(() => {
            action.dialedNumber = "abc";
        }).to.throw();

        expect(() => {
            action.dialedNumber = undefined;
        }).to.throw();

        action.dialedNumber = '+13332223333';

        expect(action.dialedNumber).to.equal('+13332223333');
        expect(action.action).to.equal(actionTypes.PATCH);
    });

    it('handles recordCall correctly', () => {
        const action = new PatchAction('+15554443333');

        expect(() => {
            // @ts-ignore
            action.recordCall = "test";
        }).to.throw();

        action.recordCall = true;
        expect(action.recordCall).to.be.true;

        action.recordCall = false;
        expect(action.recordCall).to.be.false;
    });

    it('handles holdAudio correctly', () => {
        const action = new PatchAction('+15554443333');
        const urlAudio = new UrlAudio('http://www.myaudio.com/audio.mp3');

        // @ts-ignore
        action.holdAudio = urlAudio.toJSON();

        // @ts-ignore
        expect(action.holdAudio.type).to.equal("URL");
        // @ts-ignore
        expect(action.holdAudio.location).to.equal('http://www.myaudio.com/audio.mp3');
    });

    it('handles greetingAudio correctly', () => {
        const action = new PatchAction('+15554443333');
        const urlAudio = new UrlAudio('http://www.myaudio.com/audio.mp3');

        // @ts-ignore
        action.greetingAudio = urlAudio.toJSON();

        // @ts-ignore
        expect(action.greetingAudio.type).to.equal("URL");
        // @ts-ignore
        expect(action.greetingAudio.location).to.equal('http://www.myaudio.com/audio.mp3');
    });

    it('handles patchCallerId correctly', () => {
        const action = new PatchAction('+15554443333');

        expect(() => {
            action.patchCallerId = "abc";
        }).to.throw();

        expect(() => {
            // @ts-ignore
            action.patchCallerId = 123;
        }).to.throw();

        expect(() => {
            action.patchCallerId = "15554443333";
        }).to.throw();

        action.patchCallerId = "+13332223333";

        expect(action.patchCallerId).to.equal("+13332223333");
    });

    it('handles dialedNumber correctly', () => {
        const action = new PatchAction('+15554443333');

        expect(() => {
            action.dialedNumber = "abc";
        }).to.throw();

        expect(() => {
            // @ts-ignore
            action.dialedNumber = 123;
        }).to.throw();

        expect(() => {
            action.dialedNumber = "15554443333";
        }).to.throw();

        action.dialedNumber = "+13332223333";

        expect(action.dialedNumber).to.equal("+13332223333");
    });

    it('handles patchDigit correctly', () => {
        const action = new PatchAction('+15554443333');
        action.patchDigit = "1";

        expect(action.patchDigit).to.equal("1");
    });

    it('handles passDtmf correctly', () => {
        const action = new PatchAction('+15554443333');

        expect(() => {
            // @ts-ignore
            action.passDtmf = "true";
        }).to.throw();

        expect(() => {
            // @ts-ignore
            action.passDtmf = 1;
        }).to.throw();

        action.passDtmf = true;
        expect(action.passDtmf).to.be.true;

        action.passDtmf = false;
        expect(action.passDtmf).to.be.false;
    });

    it("toJSON returns properties correctly", () => {
        const action = new PatchAction('+12223334444');

        expect(action.toJSON()).to.deep.equal({
            "action": "PATCH",
            "dialedNumber": "+12223334444",
            "passDtmf": true,
            "recordCall": false
        });
    });
})