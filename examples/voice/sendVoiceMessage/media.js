const {VoiceClient,
    VoiceMessage,
    MediaAudio, ClientConfiguration
} = require('cpaas-sdk-node');
const {AUTH_TOKEN, TO_NUMBER, VOICE_FROM_NUMBER} = require("../../../privateConst");
const {API_SANDBOX_URL} = require("../../../dist/config/constants");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(VOICE_FROM_NUMBER, TO_NUMBER);
const media = new MediaAudio('5417');

message.audio = media;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
       console.error(err);
    });
