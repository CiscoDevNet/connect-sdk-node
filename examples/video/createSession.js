const {VideoClient, VideoSession} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VIDEO_APP_ID} = require("../../privateConst");

const client = new VideoClient(AUTH_TOKEN);
const session = new VideoSession(VIDEO_APP_ID, "My test video");

const request = client.createSession(session);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });