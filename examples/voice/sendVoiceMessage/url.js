const {VoiceClient,
    VoiceMessage,
    UrlAudio} = require('../../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const message = new VoiceMessage(FROM_NUMBER);
const media = new UrlAudio("http://www.sounds.com");

media.loop = 3;

message.addDialedNumber(TO_NUMBER);
message.callbackUrl = "http://www.google.com";
message.correlationId = "cor123";
message.audio = media;

console.log(message.toJSON());
