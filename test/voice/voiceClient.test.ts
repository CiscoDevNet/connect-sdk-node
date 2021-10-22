import {VoiceClient, VoiceMessage, VoiceCall, ClientConfiguration} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_VERSION} from "../../src/config/constants";

const API_SANDBOX_URL = "https://api-sandbox.imiconnect.io";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("VoiceClient", () => {
    const clientConfig = new ClientConfiguration('123', API_SANDBOX_URL);

    it("throws error if idempotencyKey is blank for sending a voice message", () => {
        const client = new VoiceClient(clientConfig);
        const message = new VoiceMessage('+14443332222', '+13332223333');

        stub(message, 'idempotencyKey').get(() => '');

        expect(() => {
            client.sendVoiceMessage(message);
        }).to.throw("Must provide a 'idempotencyKey' value for sending a voice message");

        stub(message, 'idempotencyKey').restore();
    });

    it('throws error if callerId is not proper for sendVoiceMessage', () => {
        const client = new VoiceClient(clientConfig);
        const message = new VoiceMessage('+14443332222', '+13334440000');

        nock(`${API_SANDBOX_URL}`)
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
        const client = new VoiceClient(clientConfig);
        const message = new VoiceMessage('+14443332222', '+13334440000');

        nock(`${API_SANDBOX_URL}`)
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

        stub(message, 'dialedNumber').get(() => '');

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
        const client = new VoiceClient(clientConfig);
        const message = new VoiceCall('+14443332222', '+12223334444');

        nock(`${API_SANDBOX_URL}`)
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
        const client = new VoiceClient(clientConfig);
        const message = new VoiceCall('+14443332222', '+13334440000');

        message.callbackUrl = "http://www.google.com";

        nock(`${API_SANDBOX_URL}`)
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
        const client = new VoiceClient(clientConfig);
        const message = new VoiceCall('+14443332222', '+13334440000');

        message.callbackUrl = "http://www.google.com";

        nock(`${API_SANDBOX_URL}`)
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

        stub(message, 'dialedNumber').get(() => '');

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
        const client = new VoiceClient(clientConfig);
        const message = new VoiceMessage('+14443332222', '+13334440000');

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(202, {});

        response = await client.sendVoiceMessage(message);

        // @ts-ignore
        expect(response.sessions).to.deep.equal([]);

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(400, {
                code: '1234'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(403, {
                code: '456'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('456');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(500, {
                code: '890'
            });

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('890');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .reply(600);

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err).to.deep.equal({
                "body": "",
                "error": undefined,
                "headers": {},
                "statusCode": 600
            })
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/messages`)
            .replyWithError("test error");

        try {
            response = await client.sendVoiceMessage(message);
        } catch(err: any) {
            expect(err.error.message).to.equal("test error");
        }
    });

    it("returns proper values on placeCall", async () => {
        const client = new VoiceClient(clientConfig);
        const message = new VoiceCall('+14443332222', '+13334440000');

        message.callbackUrl = "http://www.google.com";

        nock(`${API_SANDBOX_URL}`)
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

        nock.cleanAll();

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(202, {});

        response = await client.placeCall(message);

        // @ts-ignore
        expect(response.sessions).to.deep.equal([]);

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(404, {
                code: '456'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.code).to.equal('456');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(500, {
                code: '890'
            });

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.code).to.equal('890');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/calls`)
            .reply(600);

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '',
                error: undefined,
                headers: {}
            })
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/voice/calls`)
            .replyWithError("test error");

        try {
            response = await client.placeCall(message);
        } catch(err: any) {
            expect(err.error.message).to.equal("test error");
        }

    });

    it("returns proper values on getStatus", async () => {
        const client = new VoiceClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .reply(200, {
                "sessionId": "1da5e55c-52e4-4054-bec4-43256dd2eb91",
                "error": {
                    "code": 123,
                    "message": "test error"
                }
            });

        response = await client.getStatus('1234');

        // @ts-ignore
        expect(response.error).to.deep.equal({
            "code": 123,
            "message": "test error"
        });

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .reply(600);

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '',
                error: undefined,
                headers: {}
            })
        }

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234`)
            .replyWithError("test error");

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err.error.message).to.equal("test error");
        }
    });

    it('call must include a callback url', () => {
        const client = new VoiceClient(clientConfig);
        const voiceCall = new VoiceCall('+14443332222', '+13334440000');

        expect(() => {
            client.placeCall(voiceCall);
        }).to.throw()

    })

    it("returns proper values on getRecordings", async () => {
        const client = new VoiceClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .reply(200, {
                "sessionId": "1da5e55c-52e4-4054-bec4-43256dd2eb91",
            });

        response = await client.getRecordings('1234');

        // @ts-ignore
        expect(response.recordings).to.deep.equal([]);

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
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

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .reply(600);

        try {
            response = await client.getRecordings('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '',
                error: undefined,
                headers: {}
            })
        }

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/voice/calls/1234/recordings`)
            .replyWithError("test error");

        try {
            response = await client.getRecordings('1234');
        } catch(err: any) {
            expect(err.error.message).to.equal("test error");
        }
    });

});