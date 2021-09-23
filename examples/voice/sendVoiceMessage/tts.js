const {VoiceClient,
    VoiceMessage,
    TtsAudio,
    StyleType,
    GenderType,
    TextFormatType} = require('../../../dist');

const client = new VoiceClient('f2d88f74-1966-11ec-a806-025578af612b');
const message = new VoiceMessage("+12019401281");
const audio = new TtsAudio("Hello World");

audio.loop = 3;
audio.style = StyleType.NEURAL;
audio.language = "EN_US";
audio.voice = "Aria";
audio.gender = GenderType.MALE;
audio.text = "Hello world";
audio.engine = "AZURE";
audio.textFormat = TextFormatType.TEXT;

message.addDialedNumber('+15613172975');
message.callbackUrl = "http://www.google.com";
message.correlationId = "cor123";
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
