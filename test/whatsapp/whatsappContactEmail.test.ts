import {WhatsappContactEmail} from '../../src/api/whatsapp/contacts/whatsappContactEmail'
import {expect} from "chai";
import {EmailType} from "../../src";

describe("WhatsappContactEmail", () => {

    it("sets values properly", () => {
        const email = new WhatsappContactEmail();

        expect(() => {
            email.type = "OOIJAOFA";
        }).to.throw();

        email.type = EmailType.HOME;

        expect(() => {
            email.address = "oijarfoa";
        }).to.throw();

        email.address = "someone@somewhere.com";

        expect(email.type).to.equal(EmailType.HOME);
        expect(email.address).to.equal("someone@somewhere.com");
    });

    it("toJSON returns properties correctly", () => {
        const email = new WhatsappContactEmail();

        email.address = "someone@somewhere.com";

        expect(email.toJSON()).to.deep.equal({
            "address": "someone@somewhere.com"
        });
    });

});