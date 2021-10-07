const {VideoClient, VideoSession, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VIDEO_APP_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VideoClient(clientConfiguration);
const session = new VideoSession(VIDEO_APP_ID, "My test video");

const request = client.createSession(session);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });