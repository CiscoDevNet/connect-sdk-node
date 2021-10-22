import {expect} from "chai";
import request from '../src/request/index';
import {ClientConfiguration} from "../src";

const API_SANDBOX_URL = "https://api-sandbox.imiconnect.io";

const chaiHttp = require('chai-http'),
    nock = require('nock'),
    chai = require('chai');

chai.use(chaiHttp);

describe("Request", () => {
    const clientConfig = new ClientConfiguration('123', API_SANDBOX_URL);
    const clientConfigHttp = new ClientConfiguration('123', "http://www.google.com");

    it("sends the request and returns the correct response", async () => {
        const reqOptions = {
            method: 'GET',
            path: '/something'
        }

        nock(`${API_SANDBOX_URL}`)
            .get('/something')
            .reply(200, "Hello World", {'request-id': '12345'});

        let response = await request(reqOptions, clientConfig);

        // @ts-ignore
        expect(response.statusCode).to.equal(200);
        // @ts-ignore
        expect(response.body).to.equal("Hello World");
        // @ts-ignore
        expect(response.headers['request-id']).to.equal('12345');

        nock.cleanAll();

        nock(`${API_SANDBOX_URL}`)
            .get('/something')
            .reply(200, "Hello World");

        response = await request(reqOptions, clientConfig);

        // @ts-ignore
        expect(response.headers).to.deep.equal({});
    });

    it("sends http request correctly", async () => {
        const reqOptions = {
            method: 'GET',
            path: '/something'
        }

        nock("http://www.google.com")
            .get('/something')
            .reply(200, "Hello World", {'request-id': '12345'});

        let response = await request(reqOptions, clientConfigHttp);

        // @ts-ignore
        expect(response.statusCode).to.equal(200);
        // @ts-ignore
        expect(response.body).to.equal("Hello World");
        // @ts-ignore
        expect(response.headers['request-id']).to.equal('12345');
    });

    it("fails correctly", async () => {
        const reqOptions = {
            method: 'GET',
            path: '/something'
        }

        const scope = nock(`${API_SANDBOX_URL}`)
            .get('/something')
            .replyWithError("Invalid Request");

        let response:any;

        try{
            response = await request(reqOptions, clientConfig);
        } catch(e:any) {
            expect(e.error.message).to.equal("Invalid Request");
        }
    });
})