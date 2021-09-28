import {expect} from "chai";
import {byteArrToHex, typeToArr, concatTypes} from '../src/helpers/tools';

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

    it('typeToArr outputs correctly', () => {
        enum Types {
            TEXT = "TEXT",
            IMAGE = "IMAGE"
        }

        expect(typeToArr(Types)).to.deep.equal(["TEXT", "IMAGE"]);
    });

    it('concatTypes outputs correctly', () => {
        const types = ["TEXT", "IMAGE"];

        expect(concatTypes(types)).to.equal("TEXT, IMAGE");
    })

});