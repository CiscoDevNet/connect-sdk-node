import {SmsClient, SmsMessage} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_URL, API_PORT, API_VERSION} from "../../src/config/constants";

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
        }).to.throw("Must provide a 'content', or 'binaryContent' value for sending a message");

        stub(smsMessage, 'content').restore();
    });

    it("returns proper values on sendMessage", async () => {
        const smsClient = new SmsClient('bearer test: 1234');
        const smsMessage = new SmsMessage('12345', '+14443332222');
        smsMessage.content = "Hello World";

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(202, {
                acceptedTime: '2021-08-01T14:24:33.000Z'
            });

        let response = await smsClient.sendMessage(smsMessage);

        // @ts-ignore
        expect(response.acceptedTime).to.equal('2021-08-01T14:24:33.000Z');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(400, {
                code: '123',
                message: '456'
            });

        try {
            response = await smsClient.sendMessage(smsMessage);
        } catch(err: any) {
            expect(err.code).to.equal('123');
            expect(err.message).to.equal('456');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(500, {
                code: '123',
                message: '456'
            });

        try {
            response = await smsClient.sendMessage(smsMessage);
        } catch(err: any) {
            expect(err.code).to.equal('123');
            expect(err.message).to.equal('456');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(600, {
                code: '123',
                message: '456'
            });

        try {
            response = await smsClient.sendMessage(smsMessage);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"123","message":"456"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }


    });

    it("returns proper values on getStatus", async () => {
        const smsClient = new SmsClient('bearer test: 1234');

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(200, {
                messageId: '1234'
            });

        let response = await smsClient.getStatus('1234');

        // @ts-ignore
        expect(response.messageId).to.not.be.null;

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(404, {}, {
                'request-id': '1234'
            });

        try {
            response = await smsClient.getStatus('1234');
        } catch(err: any) {
            expect(err.statusCode).to.equal(404);
            expect(err.requestId).to.equal('1234');
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(500, {
                code: '123',
                message: '456'
            });

        try {
            response = await smsClient.getStatus('1234');
        } catch(err: any) {
            expect(err.code).to.equal('123');
            expect(err.message).to.equal('456');
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(600, {
                code: '123',
                message: '456'
            });

        try {
            response = await smsClient.getStatus('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"123","message":"456"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });
});