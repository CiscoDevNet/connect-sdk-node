# cpaas-sdk-node

NodeJS SDK for CPaas Web Services

## Installation
Using npm:
```shell
$ npm i --save connect-sdk-node
```

## Requirements

- NodeJS 14+

## Examples
[Sending a SMS message](#sending-a-sms-message)\
[Sending a TTS voice message](#sending-a-tts-voice-message)\
[Sending a WhatsApp text message](#sending-a-whatsapp-text-message)

### Sending a SMS message

````javascript
const {SmsClient, SmsMessage, ClientConfiguration} = require('connect-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage().of_text(SMS_FROM_NUMBER, TO_NUMBER, "Hello $(name)!");

smsMessage.correlationId = "corId123";
smsMessage.callbackUrl = new URL(POST_CALLBACK_URL);
smsMessage.callbackData = "id:123|title:testData";
smsMessage.addSubstitution("name", "Tester");

const request = smsClient.sendMessage(smsMessage);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });

````

### Sending a TTS voice message

````javascript
const {VoiceClient,
    VoiceMessage,
    TtsAudio, ClientConfiguration
} = require('connect-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(VOICE_FROM_NUMBER, TO_NUMBER);
const audio = new TtsAudio("Hello World");

message.audio = audio;

const request = client.sendVoiceMessage(message);

request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });

````

### Sending a WhatsApp text message

````javascript
const {WhatsappClient, WhatsappTextMessage, ClientConfiguration} = require('connect-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_URL);

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTextMessage(WHATSAPP_FROM, TO_NUMBER, "Hello $(name)!");
whatsAppMessage.callbackUrl = POST_CALLBACK_URL;
whatsAppMessage.callbackData = "id:123|title:testData";
whatsAppMessage.correlationId = "corlId123";

whatsAppMessage.addSubstitution("name", "tester");

const request = whatsAppClient.sendMessage(whatsAppMessage);


request
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });


````

## License

&copy; 2021 Cisco Systems, Inc. and/or its affiliates. All Rights Reserved. See [LICENSE](LICENSE) for details.