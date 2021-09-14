import {WhatsappClient, WhatsappTextMessage} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_URL} from "../../src/config/constants";
import {API_PORT} from "../../src/config/constants";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("WhatsappClient", () => {
    it("throws error if idempotencyKey is blank", () => {
        const client = new WhatsappClient('bearer test: 1234');
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'idempotencyKey').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'idempotencyKey' value for sending a message");

        stub(message, 'idempotencyKey').restore();
    });

    it("throws error if 'to' is blank", () => {
        const client = new WhatsappClient('bearer test: 1234');
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'to').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'to' value for sending a message");

        stub(message, 'to').restore();
    });

    it("throws error if 'from' is blank", () => {
        const client = new WhatsappClient('bearer test: 1234');
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'from').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'from' value for sending a message");

        stub(message, 'from').restore();
    });

    it("returns proper values on sendMessage", async () => {
        const client = new WhatsappClient('bearer test: 1234');
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');
        message.content = "Hello World";

        const scope = nock(`${API_URL}:${API_PORT}`)
            .post('/v1/whatsapp/messages')
            .reply(200, {
                acceptedTime: '2021-08-01T14:24:33.000Z'
            });

        const response = await client.sendMessage(message);

        // @ts-ignore
        const respJSON = JSON.parse(response);

        // @ts-ignore
        expect(respJSON.acceptedTime).to.equal('2021-08-01T14:24:33.000Z');
    });

    it("returns proper values on getStatus", async () => {
        const client = new WhatsappClient('bearer test: 1234');

        const scope = nock(`${API_URL}:${API_PORT}`)
            .get('/v1/whatsapp/messages/1234')
            .reply(200, {
                messageId: '1234'
            });

        const response = await client.getStatus('1234');

        // @ts-ignore
        expect(response.messageId).to.not.be.null;
    });

});