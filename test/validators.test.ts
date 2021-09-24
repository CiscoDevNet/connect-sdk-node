import {expect} from "chai";
import {isValidHttpUrl, isValidISO8601, isValidE164, isNumeric, isFloat, isArrayBool, isBinary, isBoolean, hasUnicode} from '../src/helpers/validators';

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

    it('isFloat validates correctly', () => {
        expect(isFloat('abc')).to.be.false;
        expect(isFloat('1')).to.be.false;
        expect(isFloat('1.2')).to.be.false;
        expect(isFloat(1)).to.be.false;
        expect(isFloat(1.2)).to.be.true;
    })

    it("isBinary validates correctly", () => {
        expect(isBinary('abc')).to.be.false;
    });

    it("isArrayBool validates correctly", () => {
        expect(isArrayBool('123')).to.be.false;
        expect(isArrayBool(['abc', 'def'])).to.be.false;
        expect(isArrayBool([0, 1, 0, 0, 1])).to.be.true;
    });

    it("isBoolean validates correctly", () => {
        expect(isBoolean('abc')).to.be.false;
        expect(isBoolean(123)).to.be.false;
        expect(isBoolean(true)).to.be.true;
        expect(isBoolean(false)).to.be.true;
    });

    it("hasUnicode validates correctly", () => {
        expect(hasUnicode('abc')).to.be.false;
        expect(hasUnicode("Hello World 🗺️!")).to.be.true;
    });
});
