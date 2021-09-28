import {expect} from "chai";
import {byteArrToHex} from '../src/helpers/tools';

describe("Tools", () => {
    it("byteArrToHex converts correctly", () => {
        const data = new Uint8Array(5);
        data[0] = 72;
        data[1] = 101;
        data[2] = 108;
        data[3] = 108;
        data[4] = 111;

        expect(byteArrToHex(data)).to.equal("48656c6c6f");
    });
});