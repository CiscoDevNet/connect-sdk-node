const {VoiceClient} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VOICE_SESSION_ID} = require("../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const request = client.getRecordings(VOICE_SESSION_ID)

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });