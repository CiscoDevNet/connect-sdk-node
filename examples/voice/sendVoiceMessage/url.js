const {VoiceClient,
    VoiceMessage,
    UrlAudio, ClientConfiguration
} = require('connect-sdk-node');
const {AUTH_TOKEN, VOICE_FROM_NUMBER, TO_NUMBER, VOICE_AUDIO_FILE, API_URL} = require("../../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(VOICE_FROM_NUMBER, TO_NUMBER);
const media = new UrlAudio(VOICE_AUDIO_FILE);

message.audio = media;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
