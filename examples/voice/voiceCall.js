const {VoiceClient, VoiceCall, UrlAudio} = require('../../dist');
const {PlayAction} = require('../../dist/api/voice/callbackResponses/playAction');
const {AUTH_TOKEN, FROM_NUMBER, TO_NUMBER} = require("../../privateConst");

const client = new VoiceClient(AUTH_TOKEN);
const call = new VoiceCall(FROM_NUMBER);
call.addDialedNumber(TO_NUMBER);
call.callbackUrl = "http://www.google.com";
call.correlationId = "cor123";
call.recordCallSeconds = 23;
call.detectVoiceMail = true;

const play = new PlayAction();
const audio = new UrlAudio('http://www.audio.com/sound.mp3');

play.maxDigits = 1.2;

console.log(play.toJson());

//console.log(call.toJSON());
