import {VideoClient, VideoSession, VideoToken} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_URL, API_PORT} from "../../src/config/constants";
import {API_VERSION} from "../../dist/config/constants";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("VideoClient", () => {

    it("throws error if required values are not proper for creating a video session", () => {
        const client = new VideoClient('bearer test: 1234');
        const session = new VideoSession('12345', 'test session');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions`)
            .reply(201, {
                "appId": "12345",
                "name": "test session"
            });

        expect(() => {
            client.createSession(session);
        }).to.not.throw();

        stub(session, 'idempotencyKey').get(() => '');

        expect(() => {
            client.createSession(session);
        }).to.throw();

        stub(session, 'idempotencyKey').get(() => '12345');
        stub(session, 'idempotencyKey').restore();

        stub(session, 'appId').get(() => '');

        expect(() => {
            client.createSession(session);
        }).to.throw();

        stub(session, 'appId').get(() => '12345');
        stub(session, 'appId').restore();

        stub(session, 'name').get(() => '');

        expect(() => {
            client.createSession(session);
        }).to.throw();

        stub(session, 'name').restore();
    });

    it("returns proper values on createSession", async () => {
        const client = new VideoClient('bearer test: 1234');
        const session = new VideoSession('12345', 'test session');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions`)
            .reply(201, {
                "sessionId": "12345"
            }, {
                'Location': 'http://mysession.com'
            });

        let response = await client.createSession(session);

        expect(response.sessionId).to.equal('12345');
        expect(response.location).to.equal('http://mysession.com');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions`)
            .reply(400, {
                code: '1234',
                message: 'error msg'
            });

        try {
            response = await client.createSession(session);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions`)
            .reply(500, {
                code: '890',
                message: 'error msg'
            });

        try {
            response = await client.createSession(session);
        } catch(err: any) {
            expect(err.code).to.equal('890');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions`)
            .reply(600, {
                code: '890',
                message: 'error msg'
            });

        try {
            response = await client.createSession(session);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890","message":"error msg"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

    it("throws error if required values are not proper for creating a video token", () => {
        const client = new VideoClient('bearer test: 1234');
        const token = new VideoToken('12345');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions/12345/tokens`)
            .reply(200, {
                "token": "14ced030-183b-4dfd-966d-c3c4a285f66a",
                "expiresAt": "2021-08-01T13:03:00.000Z"
            });

        stub(token, 'idempotencyKey').get(() => '');

        expect(() => {
            client.createToken(token);
        }).to.throw();

        stub(token, 'idempotencyKey').get(() => '12345');
        stub(token, 'idempotencyKey').restore();

        stub(token, 'sessionId').get(() => '');

        expect(() => {
            client.createToken(token);
        }).to.throw();

        stub(token, 'sessionId').restore();
    });

    it("returns proper values on createToken", async () => {
        const client = new VideoClient('bearer test: 1234');
        const token = new VideoToken('12345');

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions/12345/tokens`)
            .reply(200, {
                "token": "14ced030-183b-4dfd-966d-c3c4a285f66a",
                "expiresAt": "2021-08-01T13:03:00.000Z"
            });

        let response = await client.createToken(token);

        expect(response.token).to.equal("14ced030-183b-4dfd-966d-c3c4a285f66a");
        expect(response.expiresAt).to.equal("2021-08-01T13:03:00.000Z");

        nock.cleanAll();

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions/12345/tokens`)
            .reply(400, {
                code: '1234',
                message: 'error msg'
            });

        try {
            response = await client.createToken(token);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions/12345/tokens`)
            .reply(500, {
                code: '890',
                message: 'error msg'
            });

        try {
            response = await client.createToken(token);
        } catch(err: any) {
            expect(err.code).to.equal('890');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .post(`/${API_VERSION}/video/sessions/12345/tokens`)
            .reply(600, {
                code: '890',
                message: 'error msg'
            });

        try {
            response = await client.createToken(token);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890","message":"error msg"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

    it('retrieveSession responds properly', async () => {
        const client = new VideoClient('bearer test: 1234');

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/video/sessions/12345`)
            .reply(200, {
                "appId": "a786c77d-57a2-4010-b875-51fde17aa72b",
                "name": "My Video Session",
                "sessionId": "c251a7de-0523-4f34-8914-45e71a4c114f"
            });

        let response = await client.retrieveSession('12345');

        // @ts-ignore
        expect(response.appId).to.equal("a786c77d-57a2-4010-b875-51fde17aa72b");

        // @ts-ignore
        expect(response.name).to.equal("My Video Session");

        // @ts-ignore
        expect(response.sessionId).to.equal("c251a7de-0523-4f34-8914-45e71a4c114f");

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/video/sessions/12345`)
            .reply(400, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.retrieveSession('12345');
        } catch(err: any) {
            expect(err.code).to.equal('807');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/video/sessions/12345`)
            .reply(500, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.retrieveSession('12345');
        } catch(err: any) {
            expect(err.code).to.equal('807');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .get(`/${API_VERSION}/video/sessions/12345`)
            .reply(600, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.retrieveSession('12345');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"807","message":"error msg"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }

    });

    it('deleteSession responds properly', async () => {
        const client = new VideoClient('bearer test: 1234');

        nock(`${API_URL}:${API_PORT}`)
            .delete(`/${API_VERSION}/video/sessions/12345`)
            .reply(200);

        let response = await client.deleteSession('12345');

        // @ts-ignore
        expect(response.statusCode).to.equal(200);

        nock(`${API_URL}:${API_PORT}`)
            .delete(`/${API_VERSION}/video/sessions/12345`)
            .reply(400, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.deleteSession('12345');
        } catch(err: any) {
            expect(err.statusCode).to.equal(400);
            expect(err.code).to.equal('807');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .delete(`/${API_VERSION}/video/sessions/12345`)
            .reply(500, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.deleteSession('12345');
        } catch(err: any) {
            expect(err.statusCode).to.equal(500);
            expect(err.code).to.equal('807');
            expect(err.message).to.equal('error msg');
        }

        nock(`${API_URL}:${API_PORT}`)
            .delete(`/${API_VERSION}/video/sessions/12345`)
            .reply(600, {
                "code": "807",
                "message": "error msg"
            });

        try {
            response = await client.deleteSession('12345');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"807","message":"error msg"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            });
        }
    });

});