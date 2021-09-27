import {WhatsappContactAddr} from '../../src/api/whatsapp/contacts/whatsappContactAddr'
import {expect} from "chai";
import {AddressType} from "../../src";

describe("WhatsappContactAddr", () => {

    it("sets values properly", () => {
        const address = new WhatsappContactAddr();

        expect(() => {
            address.type = "OOIJAOFA";
        }).to.throw();

        address.type = AddressType.HOME;
        address.street = "123 main st";
        address.city = "Beverly Hills";
        address.state = "CA";
        address.zip = "90210";
        address.country = "United States";
        address.countryCode = "US";

        expect(address.type).to.equal(AddressType.HOME);
        expect(address.street).to.equal("123 main st");
        expect(address.city).to.equal("Beverly Hills");
        expect(address.state).to.equal("CA");
        expect(address.zip).to.equal("90210");
        expect(address.country).to.equal("United States");
        expect(address.countryCode).to.equal("US");
    });

    it("toJSON returns properties correctly", () => {
        const address = new WhatsappContactAddr();

        expect(() => {
            address.type = "OOIJAOFA";
        }).to.throw();

        address.type = AddressType.HOME;
        address.street = "123 main st";
        address.city = "Beverly Hills";
        address.state = "CA";

        expect(address.toJSON()).to.deep.equal({
            "city": "Beverly Hills",
            "state": "CA",
            "street": "123 main st",
            "type": "HOME"
        });
    });

});