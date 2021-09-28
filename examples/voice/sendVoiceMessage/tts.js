const {VoiceClient,
    VoiceMessage,
    TtsAudio} = require('cpaas-sdk-node');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
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
