import {RecordAction} from '../../../src/api/voice/callbackResponses/recordAction';
import {actionTypes} from "../../../src/api/voice/callbackResponses/actionTypes";
import {expect} from "chai";
import {UrlAudio} from "../../../src";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("RecordAction", () => {
    it('sets action correctly', () => {
        const action = new RecordAction();

        expect(action.action).to.equal(actionTypes.RECORD);
    });

    it('handles audio correctly', () => {
        const action = new RecordAction();
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

    it('handles timeoutSeconds correctly', () => {
        const action = new RecordAction();

        expect(() => {
            // @ts-ignore
            action.timeoutSeconds = "abc";
        }).to.throw();

        expect(() => {
            action.timeoutSeconds = 1.1;
        }).to.throw();

        action.timeoutSeconds = 1;
        expect(action.timeoutSeconds).to.equal(1);
    });

    it('handles terminationDigit correctly', () => {
        const action = new RecordAction();

        action.terminationDigit = "1";
        expect(action.terminationDigit).to.equal("1");
    });

    it("toJSON returns properties correctly", () => {
        const action = new RecordAction();

        expect(action.toJSON()).to.deep.equal({
            "action": "RECORD"
        });
    });
})