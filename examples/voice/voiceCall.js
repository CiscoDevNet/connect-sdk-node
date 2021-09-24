const {VoiceClient, VoiceCall, UrlAudio} = require('../../dist');
const {PlayAction} = require('../../dist/api/voice/callbackResponses/playAction');

const client = new VoiceClient('f2d88f74-1966-11ec-a806-025578af612b');
const call = new VoiceCall("+14443332222");
call.addDialedNumber('+15613172975');
call.callbackUrl = "http://www.google.com";
call.correlationId = "cor123";
call.recordCallSeconds = 23;
call.detectVoiceMail = true;

const play = new PlayAction();
const audio = new UrlAudio('http://www.audio.com/sound.mp3');

play.maxDigits = 1.2;

console.log(play.toJson());

//console.log(call.toJSON());
