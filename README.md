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
const {SmsClient, SmsMessage, ClientConfiguration} = require('cpaas-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, API_SANDBOX_URL);

const smsClient = new SmsClient(clientConfiguration);
const smsMessage = new SmsMessage(SMS_FROM_NUMBER, TO_NUMBER);

smsMessage.content = "Hello $(name)!";
smsMessage.correlationId = "corId123";
smsMessage.callbackUrl = new URL(CALLBACK_URL);
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
} = require('cpaas-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_URL));

const client = new VoiceClient(clientConfiguration);
const message = new VoiceMessage(FROM_NUMBER);
const audio = new TtsAudio("Hello World");

message.dialedNumber = TO_NUMBER;
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
const {WhatsappClient, WhatsappTextMessage, ClientConfiguration} = require('cpaas-sdk-node');

const clientConfiguration = new ClientConfiguration(AUTH_TOKEN, new URL(API_URL));

const whatsAppClient = new WhatsappClient(clientConfiguration);
const whatsAppMessage = new WhatsappTextMessage(FROM_NUMBER, TO_NUMBER, "Hello World!");
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