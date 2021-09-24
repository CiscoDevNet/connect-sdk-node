import {AnswerAction} from '../../../src/api/voice/callbackResponses/answerAction';
import {actionTypes} from "../../../src/api/voice/callbackResponses/actionTypes";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("AnswerAction", () => {
    it('sets action type properly', () => {
        const action = new AnswerAction();

        expect(action.action).to.equal(actionTypes.ANSWER);
    });

    it("toJSON returns properties correctly", () => {
        const action = new AnswerAction();

        expect(action.toJSON()).to.deep.equal({
            action: actionTypes.ANSWER
        });
    });
})