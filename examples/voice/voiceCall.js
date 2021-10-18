const {VoiceClient, VoiceCall, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, TO_NUMBER, VOICE_FROM_NUMBER, POST_CALLBACK_URL} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VoiceClient(clientConfiguration);
const call = new VoiceCall(VOICE_FROM_NUMBER, TO_NUMBER);
call.callbackUrl = POST_CALLBACK_URL;
call.recordCallSeconds = 10;
call.correlationId = "corlId123";

const request = client.placeCall(call);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });