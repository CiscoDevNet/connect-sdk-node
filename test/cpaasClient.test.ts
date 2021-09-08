import {CpaasClient} from "../src/api/cpaasClient";
import {expect} from "chai";

describe("CpaasClient", () => {
    it("bearer token is set when client is created", () => {
        const cpaasClient = new CpaasClient('1234');

        expect(cpaasClient.bearerToken).to.equal('1234');
    });

    it("resets the bearer token when called explicitly", () => {
        const cpaasClient = new CpaasClient('1234');
        cpaasClient.bearerToken = '5678';

        expect(cpaasClient.bearerToken).to.equal('5678');
    });
});