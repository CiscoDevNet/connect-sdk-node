const {VideoClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VIDEO_SESSION_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VideoClient(clientConfiguration);
const request = client.deleteSession(VIDEO_SESSION_ID);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });