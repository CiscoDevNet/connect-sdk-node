import {VoiceClient, VoiceMessage, VoiceCall} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_URL, API_PORT, API_VERSION} from "../../src/config/constants";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("VoiceClient", () => {
    it("throws error if idempotencyKey is blank for sending a voice message", () => {
        const client = new VoiceClient('bearer test: 1234');
        const message = new VoiceMessage('+14443332222');

        stub(message, 'idempotencyKey').get(() => '');

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.throw("Must provide a 'idempotencyKey' value for sending a voice message");

        stub(message, 'idempotencyKey').restore();
    });

    it('throws error if callerId is not proper for sendVoiceMessage', () => {
        const client = new VoiceClient('123');
        const message = new VoiceMessage('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.not.throw();

        stub(message, 'callerId').get(() => '');

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.throw();

        stub(message, 'callerId').restore();
    });

    it('throws error if dialedNumber array is not proper for sendVoiceMessage', () => {
        const client = new VoiceClient('123');
        const message = new VoiceMessage('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.not.throw();

        stub(message, 'dialedNumber').get(() => []);

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.throw();

        stub(message, 'dialedNumber').get(() => undefined);

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.throw();

        stub(message, 'dialedNumber').restore();
    });

    it("throws error if idempotencyKey is blank for sending a voice call", () => {
        const client = new VoiceClient('bearer test: 1234');
        const message = new VoiceCall('+14443332222');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        stub(message, 'idempotencyKey').get(() => '');

        expect(() => {
            client.placeCall(message);
        }).to.throw("Must provide a 'idempotencyKey' value for sending a voice call");

        stub(message, 'idempotencyKey').restore();
    });

    it('throws error if callerId is not proper for placeCall', () => {
        const client = new VoiceClient('123');
        const message = new VoiceCall('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        expect(() => {
            client.placeCall(message);
        }).to.not.throw();

        stub(message, 'callerId').get(() => '');

        expect(() => {
            client.placeCall(message);
        }).to.throw();

        stub(message, 'callerId').restore();
    });

    it('throws error if dialedNumber array is not proper for placeCall', () => {
        const client = new VoiceClient('123');
        const message = new VoiceCall('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        expect(() => {
            client.placeCall(message);
        }).to.not.throw();

        stub(message, 'dialedNumber').get(() => []);

        expect(() => {
            client.placeCall(message);
        }).to.throw();

        stub(message, 'dialedNumber').get(() => undefined);

        expect(() => {
            client.placeCall(message);
        }).to.throw();

        stub(message, 'dialedNumber').restore();
    });

    it("returns proper values on sendVoiceMessage", async () => {
        const client = new VoiceClient('bearer test: 1234');
        const message = new VoiceMessage('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        let response = await client.sendVoiceMessage(message);

        // @ts-ignore
        expect(response.sessions[0].sessionId).to.equal('0e36bb32-5f5d-46c9-b132-85e010a80c2a');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(400, {
                code: '1234'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(403, {
                code: '456'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('456');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(500, {
                code: '890'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('890');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(600, {
                code: '890'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

    it("returns proper values on placeCall", async () => {
        const client = new VoiceClient('bearer test: 1234');
        const message = new VoiceCall('+14443332222');
        message.addDialedNumber('+13334440000');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(202, {
                "sessions": [
                    {
                        "sessionId": "0e36bb32-5f5d-46c9-b132-85e010a80c2b",
                        "status": "QUEUED",
                        "dialedNumber": "string"
                    }
                ]
            });

        let response = await client.placeCall(message);

        // @ts-ignore
        expect(response.sessions[0].sessionId).to.equal('0e36bb32-5f5d-46c9-b132-85e010a80c2a');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(400, {
                code: '1234'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
        }

        nock.cleanAll();

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(404, {
                code: '456'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.code).to.equal('456');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(500, {
                code: '890'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.code).to.equal('890');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(600, {
                code: '890'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }

    });

    it("returns proper values on getStatus", async () => {
        const client = new VoiceClient('bearer test: 1234');

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .reply(200, {
                "sessionId": "1da5e55c-52e4-4054-bec4-43256dd2eb91",
                "callerId": "+15615551212",
                "dialedNumber": "+19545551212",
                "status": "COMPLETED",
                "correlationId": "customer12345",
                "durationSeconds": 305,
                "offeredTime": "2021-06-01T12:30:13.495Z",
                "answeredTime": "2021-06-01T12:30:16.950Z"
            });

        let response = await client.getStatus('1234');

        // @ts-ignore
        expect(response.sessionId).to.equal("1da5e55c-52e4-4054-bec4-43256dd2eb91");

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .reply(404, {}, {
                'request-id': '1234'
            });

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                "requestId": "1234",
                "statusCode": 404
            })
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .reply(400, {});

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 400,
                body: '{}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

    it("returns proper values on getRecordings", async () => {
        const client = new VoiceClient('bearer test: 1234');

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .reply(200, {
                "sessionId": "1da5e55c-52e4-4054-bec4-43256dd2eb91",
                "recordings": [
                    {
                        "durationSeconds": 609,
                        "url": "https://myapihost.com/v3/voice/calls/1da5e55c-52e4-4054-bec4-43256dd2eb91/recordings/filename_123_456.wav"
                    }
                ]
            });

        let response = await client.getRecordings('1234');

        // @ts-ignore
        expect(response.recordings[0].durationSeconds).to.equal(609);

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .reply(404, {}, {
                'request-id': '1234'
            });

        try {
            response = await client.getRecordings('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                "requestId": "1234",
                "statusCode": 404
            })
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .reply(400, {});

        try {
            response = await client.getRecordings('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 400,
                body: '{}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

});