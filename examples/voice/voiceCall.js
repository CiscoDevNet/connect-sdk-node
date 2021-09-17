const {VoiceClient,
    VoiceCall} = require('../../dist');

const client = new VoiceClient('bearer test: 1234');
const call = new VoiceCall("+14443332222");
call.addDialedNumber('+15554440000');
call.addDialedNumber('+19993334444');
call.callbackUrl = "http://www.google.com";
call.correlationId = "cor123";
call.recordCallSeconds = 23;
call.detectVoiceMail = true;

console.log(call.toJSON());
