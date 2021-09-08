import {expect} from "chai";
import {isValidHttpUrl, isValidISO8601, isValidE164, isNumeric} from '../src/helpers/validators';

describe("Validators", () => {
    it("isValidHttpUrl validates correctly", () => {
        expect(isValidHttpUrl('http://someurl')).to.be.false;
        expect(isValidHttpUrl('abc')).to.be.false;
        expect(isValidHttpUrl('https://www.google.com')).to.be.true;
    });

    it("isValidISO8601 validates correctly", () => {
        expect(isValidISO8601('2021-08-01T14:24:33.00sdfs0Z')).to.be.false;
        expect(isValidISO8601('2021-08-01T14:24:33.000Z')).to.be.true;
    });

    it("isValidE164 validates correctly", () => {
        expect(isValidE164('14443332222')).to.be.false;
        expect(isValidE164('asdf')).to.be.false;
        expect(isValidE164('+14443332222')).to.be.true;
    });

    it("isNumeric validates correctly", () => {
        expect(isNumeric('abc')).to.be.false;
        expect(isNumeric(123)).to.be.true;
        expect(isNumeric('123')).to.be.true;
    });
});
