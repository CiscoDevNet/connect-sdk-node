const {VoiceClient,
    VoiceMessage,
    TtsAudio,
    StyleType,
    GenderType,
    TextFormatType} = require('../../../dist');

const client = new VoiceClient('bearer test: 1234');
const message = new VoiceMessage("+14443332222");
const audio = new TtsAudio("Hello World");

audio.loop = 3;
audio.style = StyleType.NEURAL;
audio.language = "EN_US";
audio.voice = "Aria";
audio.gender = GenderType.MALE;
audio.engine = "AZURE";
audio.textFormat = TextFormatType.TEXT;

message.addDialedNumber('+15554443333');
message.addDialedNumber('+19998884444');
message.callbackUrl = "http://www.google.com";
message.correlationId = "cor123";
message.audio = audio;

console.log(message.toJSON());
