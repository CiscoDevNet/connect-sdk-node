import {WhatsappContactUrl} from '../../src/api/whatsapp/contacts/whatsappContactUrl'
import {expect} from "chai";
import {UrlType} from "../../src";

describe("WhatsappContactUrl", () => {

    it("sets values properly", () => {
        const url = new WhatsappContactUrl();

        expect(() => {
            url.type = "OOIJAOFA";
        }).to.throw();

        url.type = UrlType.HOME;

        expect(() => {
            url.address = "oijarfoa";
        }).to.throw();

        url.address = "http://www.google.com";

        expect(url.type).to.equal(UrlType.HOME);
        expect(url.address).to.equal("http://www.google.com");
    });

    it("toJSON returns properties correctly", () => {
        const url = new WhatsappContactUrl();

        url.address = "http://www.google.com";

        expect(url.toJSON()).to.deep.equal({
            "address": "http://www.google.com"
        });
    });

});