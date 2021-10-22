import {ClientConfiguration, SmsClient, SmsMessage} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_VERSION} from "../../src/config/constants";

const API_SANDBOX_URL = "https://api-sandbox.imiconnect.io";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("SmsClient", () => {
    const clientConfig = new ClientConfiguration('123', API_SANDBOX_URL);

    it("throws error if idempotencyKey is blank", () => {
        const smsClient = new SmsClient(clientConfig);
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'idempotencyKey').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'idempotencyKey' value for sending a message");

        stub(smsMessage, 'idempotencyKey').restore();
    });

    it("throws error if 'to' is blank", () => {
        const smsClient = new SmsClient(clientConfig);
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'to').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'to' value for sending a message");

        stub(smsMessage, 'to').restore();
    });

    it("throws error if 'from' is blank", () => {
        const smsClient = new SmsClient(clientConfig);
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'from').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'from' value for sending a message");

        stub(smsMessage, 'from').restore();
    });

    it("throws error if 'content' is blank", () => {
        const smsClient = new SmsClient(clientConfig);
        const smsMessage = new SmsMessage('12345', '+14443332222');

        stub(smsMessage, 'content').get(() => '');

        expect(() => {
            smsClient.sendMessage(smsMessage)
        }).to.throw("Must provide a 'content', or 'binaryContent' value for sending a message");

        stub(smsMessage, 'content').restore();
    });

    it("returns proper values on sendMessage", async () => {
        const smsClient = new SmsClient(clientConfig);
        const smsMessage = new SmsMessage('12345', '+14443332222');
        smsMessage.content = "Hello World";

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(202, {
                acceptedTime: '2021-08-01T14:24:33.000Z'
            });

        let response = await smsClient.sendMessage(smsMessage);

        // @ts-ignore
        expect(response.acceptedTime).to.equal('2021-08-01T14:24:33.000Z');

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/sms/messages`)
            .reply(202);

        response = await smsClient.sendMessage(smsMessage);

        // @ts-ignore
        expect(response.acceptedTime).to.be.undefined;

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/sms/messages`)
            .replyWithError("test error");

        try {
            response = await smsClient.sendMessage(smsMessage);
        } catch(err: any) {
            expect(err.error.message).to.equal("test error")
        }

    });

    it("returns proper values on getStatus", async () => {
        const smsClient = new SmsClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(200, {
                messageId: '1234',
                error: {
                    code: '500',
                    message: 'error msg'
                }
            });

        let response = await smsClient.getStatus('1234');

        expect(response.messageId).to.equal('1234');
        expect(response.error).to.deep.equal({
            code: '500',
            message: 'error msg'
        })

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .reply(200);

        response = await smsClient.getStatus('1234');

        expect(response.messageId).to.be.undefined;


        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/sms/messages/1234`)
            .replyWithError("test error");

        try {
            response = await smsClient.getStatus('1234');
        } catch(err: any) {
            expect(err.error.message).to.equal("test error")
        }
    });
});