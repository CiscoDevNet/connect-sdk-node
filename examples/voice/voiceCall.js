const {VoiceClient,
    VoiceCall} = require('../../dist');

const client = new VoiceClient('f2d88f74-1966-11ec-a806-025578af612b');
const call = new VoiceCall("+14443332222");
call.addDialedNumber('+15613172975');
call.callbackUrl = "http://www.google.com";
call.correlationId = "cor123";
call.recordCallSeconds = 23;
call.detectVoiceMail = true;

console.log(call.toJSON());
