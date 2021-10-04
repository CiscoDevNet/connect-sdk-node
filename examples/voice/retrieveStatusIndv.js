const {VoiceClient, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VOICE_SESSION_ID} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_SANDBOX_URL));

const client = new VoiceClient(clientConfiguration);
const request = client.getStatus('8f925378-b90a-4eac-aeae-e7b17354a49b')

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });