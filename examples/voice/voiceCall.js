const {VoiceClient, VoiceCall, UrlAudio, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VoiceClient(clientConfiguration);
const call = new VoiceCall(FROM_NUMBER, TO_NUMBER);
call.callbackUrl = "http://www.google.com";
call.recordCallSeconds = 3;
call.detectVoiceMail = true;
call.correlationId = "corlId123";

const request = client.placeCall(call);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });