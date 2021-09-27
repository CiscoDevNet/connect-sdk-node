const {VoiceClient,
    VoiceMessage,
    MediaAudio} = require('cpaas-sdk-node');
const {AUTH_TOKEN, TO_NUMBER, FROM_NUMBER} = require("../../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const message = new VoiceMessage(FROM_NUMBER);
const media = new MediaAudio("media1234");

message.addDialedNumber(TO_NUMBER);
message.audio = media;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
       console.error(err);
    });
