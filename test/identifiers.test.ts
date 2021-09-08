import {uuidv4} from "../src/helpers/identifiers";
import {expect} from "chai";

describe("Helpers: Identifiers", () => {
    it("creates a uuidv4 string", () => {
        const identifier: string = uuidv4();

        expect(identifier.length).to.equal(36);
        expect(identifier[14]).to.equal('4');

        expect(identifier[8]).to.equal('-');
        expect(identifier[13]).to.equal('-');
        expect(identifier[18]).to.equal('-');
        expect(identifier[23]).to.equal('-');
    });
});