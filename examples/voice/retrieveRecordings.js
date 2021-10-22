const {VoiceClient, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, VOICE_SESSION_ID, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new VoiceClient(clientConfiguration);
const request = client.getRecordings(VOICE_SESSION_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });