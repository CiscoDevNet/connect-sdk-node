import {CpaasClient} from "../cpaasClient";
import {SmsMessage} from "./smsMessage";
import request from "../../request/index";

export class SmsClient extends CpaasClient {
    sendMessage(message: SmsMessage) {
        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a message");
        }

        if(!message.from || message.from === "") {
            throw Error("Must provide a 'from' value for sending a message");
        }

        if(!message.to || message.to === "") {
            throw Error("Must provide a 'to' value for sending a message");
        }

        if(!message.content || message.content === "") {
            throw Error("Must provide a 'content' value for sending a message");
        }

        const payload = {
            from: message.from,
            to: message.to,
            content: message.content,
            contentType: message.contentType,
            substitutions: message.substitutions,
            correlationId: message.correlationId,
            dltTemplateId: message.dltTemplateId,
            callbackUrl: message.callbackUrl,
            callbackData: message.callbackData,
            expireAt: message.expireAt
        };

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        const options = {
            method: 'POST',
            path: '/v1/sms/messages',
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload
        };

        return request(options);
    }

    getStatus(messageId: string) {
        const options = {
            method: 'GET',
            path: `/v1/sms/messages/${messageId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return request(options);
    }
}
