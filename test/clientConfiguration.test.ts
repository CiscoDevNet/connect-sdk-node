import {expect} from "chai";
import {ClientConfiguration} from "../src";
import {API_SANDBOX_DOMAIN} from "../src/config/constants";

describe("ClientConfiguration", () => {
    it("sets values correctly", () => {
        const config = new ClientConfiguration('123', new URL("https://www.google.com:8443"));

        expect(config.bearerToken).to.equal('123');

        const baseUrl = config.baseUrl;

        expect(baseUrl.hostname).to.equal('www.google.com');
        expect(baseUrl.port).to.equal("8443");
        expect(baseUrl.protocol).to.equal('https:');
    });

    it("sets port correctly", () => {
        const configHttps = new ClientConfiguration('123', new URL("https://www.google.com"));
        const configHttp = new ClientConfiguration('123', new URL("http://www.google.com"));

        expect(configHttps.hostPort).to.equal("443");
        expect(configHttp.hostPort).to.equal("80");
    });

    it("errors when improper protocol is used", () => {
        expect(() => {
            const config = new ClientConfiguration('123', new URL('ftp://www.google.com'));
        }).to.throw();
    });
});