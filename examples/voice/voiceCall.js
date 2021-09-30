const {VoiceClient, VoiceCall, UrlAudio, ClientConfiguration} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_SANDBOX_URL));

const client = new VoiceClient(clientConfiguration);
const call = new VoiceCall(FROM_NUMBER);
call.addDialedNumber(TO_NUMBER);

const audio = new UrlAudio('http://www.audio.com/sound.mp3');

call.audio = audio;

const request = client.placeCall(call);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });