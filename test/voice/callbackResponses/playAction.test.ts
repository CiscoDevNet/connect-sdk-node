import {PlayAction} from '../../../src/api/voice/callbackResponses/playAction';
import {actionTypes} from "../../../src/api/voice/callbackResponses/actionTypes";
import {expect} from "chai";
import {UrlAudio} from "../../../src";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("PlayAction", () => {
    it('sets action correctly', () => {
       const action = new PlayAction();

       expect(action.action).to.equal(actionTypes.PLAY);
    });

    it('handles recordCall correctly', () => {
        const action = new PlayAction();

        expect(() => {
            // @ts-ignore
            action.recordCall = "test";
        }).to.throw();

        action.recordCall = true;
        expect(action.recordCall).to.be.true;

        action.recordCall = false;
        expect(action.recordCall).to.be.false;
    });

    it('handles audio correctly', () => {
        const action = new PlayAction();
        const urlAudio = new UrlAudio('http://www.myaudio.com/audio.mp3');

        // @ts-ignore
        action.audio = urlAudio.toJSON();

        // @ts-ignore
        expect(action.audio.type).to.equal("URL");
        // @ts-ignore
        expect(action.audio.location).to.equal('http://www.myaudio.com/audio.mp3');
    });

    it('handles audio correctly', () => {
        const action = new PlayAction();
        const audio = new UrlAudio('http://www.audio.com/sound.mp3');

        expect(() => {
            action.audio = undefined;
        }).to.throw();

        expect(() => {
            action.audio = [];
        }).to.throw();

        action.audio = [audio];

        expect(action.audio[0].toJSON()).to.deep.equal({
            "location": "http://www.audio.com/sound.mp3",
            "type": "URL"
        })
    });

    it('handles maxDigits correctly', () => {
        const action = new PlayAction();

        expect(() => {
            // @ts-ignore
            action.maxDigits = "abc";
        }).to.throw();

        expect(() => {
            action.maxDigits = 1.1;
        }).to.throw();

        action.maxDigits = 1;
        expect(action.maxDigits).to.equal(1);
    });

    it('handles digitTimeout correctly', () => {
        const action = new PlayAction();

        expect(() => {
            // @ts-ignore
            action.digitTimeout = "abc";
        }).to.throw();

        expect(() => {
            action.digitTimeout = 1.1;
        }).to.throw();

        action.digitTimeout = 1;
        expect(action.digitTimeout).to.equal(1);
    });

    it('handles terminationDigit correctly', () => {
        const action = new PlayAction();

        action.terminationDigit = "1";
        expect(action.terminationDigit).to.equal("1");
    });

    it("toJSON returns properties correctly", () => {
        const action = new PlayAction();

        expect(action.toJSON()).to.deep.equal({
            "action": "PLAY",
            "recordCall": false
        });
    });
})