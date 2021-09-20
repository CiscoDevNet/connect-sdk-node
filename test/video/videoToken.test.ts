import {VideoToken} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("VideoToken", () => {

    it("sets constructor values properly", () => {
        const token = new VideoToken('12345');

        expect(token.sessionId).to.equal('12345');
        expect(token.idempotencyKey).to.not.equal("");
    });

    it("detects invalid property values", () => {
        const token = new VideoToken('12345');

        expect(() => {
            // @ts-ignore
            token.sessionId = undefined;
        }).to.throw();

        expect(() => {
            // @ts-ignore
            token.sessionId = "";
        }).to.throw();

        expect(() => {
            token.sessionId = "1234";
        }).to.not.throw();
    });

    it('sets values properly', () => {
        const token = new VideoToken('12345');

        token.sessionId = "999444";

        expect(token.sessionId).to.equal("999444");
    });

    it("toJSON returns properties correctly", () => {
        const token = new VideoToken('12345');

        expect(token.toJSON()).to.deep.equal({
            "sessionId": "12345"
        });
    });

});