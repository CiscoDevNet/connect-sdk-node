import {CpaasClient} from "../../cpaasClient";
import request from "../../../request";
import {WhatsappLocMessage} from "./whatsappLocMessage";

export class WhatsappLocClient extends CpaasClient {
    sendMessage(message: WhatsappLocMessage) {

        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a message");
        }

        if(!message.latitude) {
            throw Error("Must provide a 'latitude' value for sending a message");
        }

        if(!message.longitude) {
            throw Error("Must provide a 'longitude' value for sending a message");
        }

        if(!message.from || message.from === "") {
            throw Error("Must provide a 'from' value for sending a message");
        }

        if(!message.to || message.to === "") {
            throw Error("Must provide a 'to' value for sending a message");
        }

        const payload = {
            from: message.from,
            to: message.to,
            latitude: message.latitude,
            longitude: message.longitude,
            name: message.name,
            address: message.address,
            contentType: message.contentType,
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
