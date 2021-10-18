const {VoiceClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, CALL_SESS_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VoiceClient(clientConfiguration);
const request = client.getStatus(CALL_SESS_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });