const {VoiceClient,
    VoiceMessage,
    TtsAudio, ClientConfiguration
} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../../privateConst");
const {API_SANDBOX_URL} = require("../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_SANDBOX_URL));

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(FROM_NUMBER);
const audio = new TtsAudio("Hello World");

message.addDialedNumber(TO_NUMBER);
message.audio = audio;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
