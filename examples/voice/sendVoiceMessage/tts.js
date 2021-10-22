const {VoiceClient,
    VoiceMessage,
    TtsAudio, ClientConfiguration
} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VOICE_FROM_NUMBER, TO_NUMBER, API_URL} = require("../../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(VOICE_FROM_NUMBER, TO_NUMBER);
const audio = new TtsAudio("Hello World");

message.audio = audio;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
