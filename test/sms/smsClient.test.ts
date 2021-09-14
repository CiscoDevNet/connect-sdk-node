import {SmsClient, SmsMessage} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_URL, API_PORT} from "../../src/config/constants";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("SmsClient", () => {
    it("throws error if idempotencyKey is blank", () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'idempotencyKey').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'idempotencyKey' value for sending a message");

        stub(smsMessage, 'idempotencyKey').restore();
    });

    it("throws error if 'to' is blank", () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'to').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'to' value for sending a message");

        stub(smsMessage, 'to').restore();
    });

    it("throws error if 'from' is blank", () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'from').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'from' value for sending a message");

        stub(smsMessage, 'from').restore();
    });

    it("throws error if 'content' is blank", () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'content').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'content' value for sending a message");

        stub(smsMessage, 'content').restore();
    });

    it("returns proper values on sendMessage", async () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');
        smsMessage.content = "Hello World";

        const scope = nock(`${API_URL}:${API_PORT}`)
            .post('/v1/sms/messages')
            .reply(200, {
                acceptedTime: '2021-08-01T14:24:33.000Z'
            });

        const response = await smsClient.sendMessage(smsMessage);

        // @ts-ignore
        const respJSON = JSON.parse(response);

        // @ts-ignore
        expect(respJSON.acceptedTime).to.equal('2021-08-01T14:24:33.000Z');
    });

    it("returns proper values on getStatus", async () => {
        const smsClient = new SmsClient('bearer test: 1234');

        const scope = nock(`${API_URL}:${API_PORT}`)
            .get('/v1/sms/messages/1234')
            .reply(200, {
                messageId: '1234'
            });

        const response = await smsClient.getStatus('1234');

        // @ts-ignore
        expect(response.messageId).to.not.be.null;
    });
});