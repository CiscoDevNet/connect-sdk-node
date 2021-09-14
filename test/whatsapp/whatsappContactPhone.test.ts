import {WhatsappContactPhone} from '../../src/api/whatsapp/contacts/whatsappContactPhone'
import {expect} from "chai";
import {PhoneType} from "../../src";

describe("WhatsappContactPhone", () => {

    it("sets values properly", () => {
        const phone = new WhatsappContactPhone();

        expect(() => {
            phone.type = "OOIJAOFA";
        }).to.throw();

        phone.type = PhoneType.HOME;

        expect(() => {
            phone.number = "iuadf";
        }).to.throw();

        phone.number = "+15554443333";

        expect(phone.type).to.equal(PhoneType.HOME);
        expect(phone.number).to.equal("+15554443333");
    });

    it("toJSON returns properties correctly", () => {
        const phone = new WhatsappContactPhone();

        phone.type = PhoneType.HOME;
        phone.number = "+15554443333";

        expect(phone.toJSON()).to.deep.equal({
            "number": "+15554443333",
            "type": "HOME"
        });
    });

});