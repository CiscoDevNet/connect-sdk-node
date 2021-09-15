import {expect} from "chai";
import request from '../src/request/index';
import {API_URL, API_PORT} from "../src/config/constants";

const chaiHttp = require('chai-http'),
    nock = require('nock'),
    chai = require('chai');

chai.use(chaiHttp);

describe("Request", () => {

    it("sends the request and returns the correct response", async () => {
        const reqOptions = {
            method: 'GET',
            path: '/something'
        }

        const scope = nock(`${API_URL}:${API_PORT}`)
            .get('/something')
            .reply(200, "Hello World");

        const response = await request(reqOptions);

        // @ts-ignore
        expect(response.statusCode).to.equal(200);
        // @ts-ignore
        expect(response.body).to.equal("Hello World");
    });

    it("fails correctly", async () => {
        const reqOptions = {
            method: 'GET',
            path: '/something'
        }

        const scope = nock(`${API_URL}:${API_PORT}`)
            .get('/something')
            .replyWithError("Invalid Request");

        let response:any;

        try{
            response = await request(reqOptions);
        } catch(e:any) {
            expect(e.error.message).to.equal("Invalid Request");
        }
    });
})