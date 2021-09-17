const {VoiceClient,
    VoiceMessage,
    MediaAudio} = require('../../../dist');

const client = new VoiceClient('bearer test: 1234');
const message = new VoiceMessage("+14443332222");
const media = new MediaAudio("media1234");

media.loop = 3;

message.addDialedNumber('+15554443333');
message.addDialedNumber('+19998884444');
message.callbackUrl = "http://www.google.com";
message.correlationId = "cor123";
message.audio = media;

console.log(message.toJSON());
