const {VideoClient} = require('cpaas-sdk-node');
const {AUTH_TOKEN, VIDEO_SESSION_ID} = require("../../privateConst");

const client = new VideoClient(AUTH_TOKEN);

const request = client.retrieveSession(VIDEO_SESSION_ID);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });