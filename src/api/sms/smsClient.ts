import {CpaasClient} from "../cpaasClient";
import {SmsMessage} from "./smsMessage";
import request from "../../request/index";
import nock from "nock";
import {API_URL} from "../../config/constants";

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
                'Content-Type': 'application/json'
            },
            auth: {
                "Bearer": this.bearerToken
            },
            payload
        };

        const scope = nock(API_URL)
            .post('/v1/sms/messages', body => {
                return true;
            })
            .reply(202, {
                "acceptedTime": "2021-07-29T13:45:33.404Z",
                "messageId": "0e36bb32-5f5d-46c9-b132-85e010a80c2a",
                "correlationId": "de36bb32-3f5d-46c9-b132-15e010a80ccc"
            });

        return request(options);
    }

    getStatus(messageId: string) {
        const options = {
            method: 'GET',
            path: `/v1/sms/messages/${messageId}`,
            auth: {
                "Bearer": this.bearerToken
            }
        };

        const scope = nock(API_URL)
            .get(`/v1/sms/messages/${messageId}`)
            .reply(200, {
                "messageId": messageId,
                "acceptedTime": "2021-07-29T13:45:33.404Z",
                "from": 34343,
                "to": "+19545551212",
                "correlationId": "de36bb32-3f5d-46c9-b132-15e010a80ccc",
                "content": "Hello, world!",
                "contentType": "TEXT",
                "dltTemplateId": "2kRCRhhxOmT28jMn",
                "status": "QUEUED",
                "statusTime": "2021-07-29T13:45:33.404Z",
                "error": {
                    "code": "string",
                    "message": "string"
                }
            });

        return request(options);
    }
}
