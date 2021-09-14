import {CpaasClient} from "../cpaasClient";
import request from "../../request";
import {WhatsappContactMessage} from "./contacts/whatsappContactMessage";

/**
 * Client class for sending a Whatsapp message
 */

export class WhatsappClient extends CpaasClient {

    /**
     * Sends an Whatsapp message
     *
     * @param message object for sending the message to the API
     * @returns request object sent back to the client as a promise
     */

    sendMessage(message: any) {

        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a message");
        }

        if(!message.from || message.from === "") {
            throw Error("Must provide a 'from' value for sending a message");
        }

        if(!message.to || message.to === "") {
            throw Error("Must provide a 'to' value for sending a message");
        }

        const options = {
            method: 'POST',
            path: '/v1/whatsapp/messages',
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: message.toJSON()
        };

        return request(options);
    }

    /**
     * Retrieve status of an Whatsapp message
     *
     * @param messageId String of the Whatsapp message Id
     * @returns request object sent back to the client as a promise
     */

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
