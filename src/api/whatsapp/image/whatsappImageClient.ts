import {CpaasClient} from "../../cpaasClient";
import request from "../../../request";
import {WhatsappImageMessage} from "./whatsappImageMessage";

export class WhatsappImageClient extends CpaasClient {
    sendMessage(message: WhatsappImageMessage) {

        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a message");
        }

        if(!message.url || message.url === "") {
            throw Error("Must provide a 'url' value for sending a message")
        }

        if(!message.mimeType || message.mimeType === "") {
            throw Error("Must provide a 'mimeType' value for sending a message");
        }

        if(!message.from || message.from === "") {
            throw Error("Must provide a 'from' value for sending a message");
        }

        if(!message.to || message.to === "") {
            throw Error("Must provide a 'to' value for sending a message");
        }

        const payload = {
            contentType: message.contentType,
            url: message.url,
            mimeType: message.mimeType,
            from: message.from,
            to: message.to,
            caption: message.caption,
            callbackUrl: message.callbackUrl,
            callbackData: message.callbackData,
            correlationId: message.correlationId,
            substitutions: message.substitutions
        };

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        const options = {
            method: 'POST',
            path: '/v1/whatsapp/messages',
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
            path: `/v1/whatsapp/messages/${messageId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return request(options);
    }
}
