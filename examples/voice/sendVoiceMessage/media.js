const {VoiceClient,
    VoiceMessage,
    MediaAudio, ClientConfiguration
} = require('connect-sdk-node');
const {AUTH_TOKEN, TO_NUMBER, VOICE_FROM_NUMBER, VOICE_MEDIA_ID, API_URL} = require("../../../privateConst");

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(VOICE_FROM_NUMBER, TO_NUMBER);
const media = new MediaAudio(VOICE_MEDIA_ID);

message.audio = media;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
       console.error(err);
    });
