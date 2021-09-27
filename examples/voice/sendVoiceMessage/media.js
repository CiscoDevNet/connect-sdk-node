const {VoiceClient,
    VoiceMessage,
    MediaAudio} = require('../../../dist');
const {AUTH_TOKEN, TO_NUMBER, FROM_NUMBER} = require("../../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const message = new VoiceMessage(FROM_NUMBER);
const media = new MediaAudio("media1234");

media.loop = 3;

message.addDialedNumber(TO_NUMBER);
message.callbackUrl = "http://www.google.com";
message.correlationId = "cor123";
message.audio = media;

console.log(message.toJSON());
