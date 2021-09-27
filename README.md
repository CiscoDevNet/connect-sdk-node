# cpaas-sdk-node

NodeJS SDK for CPaas Web Services

## Installation
Using npm:
```shell
$ npm i --save cpaas-sdk-node
```

## Requirements

- NodeJS 14+

## Examples
[Sending a SMS message](#sending-a-sms-message)\
[Sending a TTS voice message](#sending-a-tts-voice-message)\
[Sending a WhatsApp text message](#sending-a-whatsapp-text-message)

### Sending a SMS message

````javascript
const {SmsClient, SmsMessage} = require('cpaas-sdk-node')

const smsClient = new SmsClient({AUTH_TOKEN});
const smsMessage = new SmsMessage({FROM_NUMBER}, {TO_NUMBER});

smsMessage.content = "Hello $(name), today is $(date)!";
smsMessage.addSubstitution("name", "Tester");

const response = smsClient.sendMessage(smsMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
````

### Sending a TTS voice message

````javascript
const {
    VoiceClient,
    VoiceMessage,
    TtsAudio
} = require('cpaas-sdk-node');

const client = new VoiceClient({AUTH_TOKEN});
const message = new VoiceMessage({FROM_NUMBER});
const audio = new TtsAudio("Hello World");

message.addDialedNumber({TO_NUMBER});
message.audio = audio;

const response = client.sendVoiceMessage(message);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
````

### Sending a WhatsApp text message

````javascript
const {WhatsappClient, WhatsappTextMessage} = require('cpaas-sdk-node');

const whatsAppClient = new WhatsappClient(AUTH_TOKEN);
const whatsAppMessage = new WhatsappTextMessage(FROM_NUMBER, TO_NUMBER, "Hello World!");
const response = whatsAppClient.sendMessage(whatsAppMessage);

response
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
````