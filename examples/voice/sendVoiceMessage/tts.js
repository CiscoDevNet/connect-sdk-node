const {VoiceClient,
    VoiceMessage,
    TtsAudio,
    StyleType,
    GenderType,
    TextFormatType} = require('../../../dist');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const message = new VoiceMessage(FROM_NUMBER);
const audio = new TtsAudio("Hello World");

/*
audio.loop = 3;
audio.style = StyleType.NEURAL;
audio.language = "EN_US";
audio.voice = "Aria";
audio.gender = GenderType.MALE;
audio.text = "Hello world";
audio.engine = "AZURE";
audio.textFormat = TextFormatType.TEXT;
*/

message.addDialedNumber(TO_NUMBER);
//message.callbackUrl = "http://www.google.com";
//message.correlationId = "cor123";
message.audio = audio;

console.log(message.toJSON());

const response = client.sendVoiceMessage(message);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
