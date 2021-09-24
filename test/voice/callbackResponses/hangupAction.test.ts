import {HangupAction} from '../../../src/api/voice/callbackResponses/hangupAction';
import {actionTypes} from "../../../src/api/voice/callbackResponses/actionTypes";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("HangupAction", () => {
    it('sets reason correctly when supplied in constructor', () => {
        const action = new HangupAction('test reason');

        expect(action.reason).to.equal('test reason');
    })

    it('sets action type properly', () => {
        const action = new HangupAction();

        expect(action.action).to.equal(actionTypes.HANGUP);
    });

    it("toJSON returns properties correctly", () => {
        const action = new HangupAction();
        action.reason = "hello world";

        expect(action.toJSON()).to.deep.equal({
            action: actionTypes.HANGUP,
            reason: 'hello world'
        });

        action.reason = undefined;

        expect(action.toJSON()).to.deep.equal({
            action: actionTypes.HANGUP
        });
    });
})