import {CpaasClient} from "../../cpaasClient";
import request from "../../../request";
import {TtsVoiceMessage} from "./ttsVoiceMessage";
import {TtsVoiceCall} from "./ttsVoiceCall";

export class TtsVoiceClient extends CpaasClient {
    sendVoiceMessage(message: TtsVoiceMessage) {
        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a voice message");
        }

        if(!message.callerId || message.callerId === "") {
            throw Error("Must provide a 'callerId' value for sending a voice message");
        }

        if(!message.dialedNumber || message.dialedNumber.length < 1) {
            throw Error("Must provide at least one 'dialedNumber' for sending a voice message");
        }

        const payload = {
            callerId: message.callerId,
            dialedNumber: message.dialedNumber,
            audio: message.audio,
            callbackUrl: message.callbackUrl,
            correlationId: message.correlationId
        };

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        const options = {
            method: 'POST',
            path: '/v1/voice/messages',
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload
        };

        return request(options);
    }

    placeCall(callData: TtsVoiceCall) {
        if(!callData.idempotencyKey || callData.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a voice message");
        }

        if(!callData.callerId || callData.callerId === "") {
            throw Error("Must provide a 'callerId' value for sending a voice message");
        }

        if(!callData.dialedNumber || callData.dialedNumber.length < 1) {
            throw Error("Must provide at least one 'dialedNumber' for sending a voice message");
        }

        const payload = {
            callerId: callData.callerId,
            dialedNumber: callData.dialedNumber,
            callbackUrl: callData.callbackUrl,
            recordCallSeconds: callData.recordCallSeconds,
            detectVoiceMail: callData.detectVoiceMail,
            correlationId: callData.correlationId
        };

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        const options = {
            method: 'POST',
            path: '/v1/voice/calls',
            headers: {
                'Idempotency-Key': callData.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload
        };

        return request(options);
    }

    getStatus(sessionId: string) {
        const options = {
            method: 'GET',
            path: `/v1/voice/calls/${sessionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return request(options);
    }

    getRecordings(sessionId: string) {
        const options = {
            method: 'GET',
            path: `/v1/voice/calls/${sessionId}/recordings`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return request(options);
    }
}
