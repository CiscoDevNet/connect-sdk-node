import {VideoSession} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("VideoSession", () => {

    it("sets constructor values properly", () => {
        const session = new VideoSession('12345', 'my test');

        expect(session.appId).to.equal('12345');
        expect(session.name).to.equal('my test');
        expect(session.idempotencyKey).to.not.equal("");
    });

    it("detects invalid property values", () => {
        const session = new VideoSession('12345', 'my test');

        expect(() => {
            // @ts-ignore
            session.appId = undefined;
        }).to.throw();

        expect(() => {
            // @ts-ignore
            session.appId = "";
        }).to.throw();

        expect(() => {
            session.appId = "1234";
        }).to.not.throw();

        expect(() => {
            session.name = undefined;
        }).to.throw();

        expect(() => {
            session.name = "";
        }).to.throw();

        expect(() => {
            session.name = "1234";
        }).to.not.throw();
    });

    it('sets values properly', () => {
        const session = new VideoSession('12345', 'my test');

        session.appId = "12345";
        session.name = "my test";

        expect(session.appId).to.equal("12345");
        expect(session.name).to.deep.equal("my test");
    });

    it("toJSON returns properties correctly", () => {
        const session = new VideoSession('12345', 'my test');

        expect(session.toJSON()).to.deep.equal({
            "appId": "12345",
            "name": "my test"
        });
    });

});