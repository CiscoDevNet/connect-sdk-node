const {VoiceClient, VoiceCall, ClientConfiguration} = require('connect-sdk-node');
const {AUTH_TOKEN, TO_NUMBER, VOICE_FROM_NUMBER, POST_CALLBACK_URL, API_URL} = require("../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

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