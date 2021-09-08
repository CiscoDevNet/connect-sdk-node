import {CpaasClient} from "../cpaasClient";
import {SmsMessage} from "./smsMessage";
import {uuidv4} from "../../helpers/identifiers";

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

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "acceptedTime": "2021-07-29T13:45:33.404Z",
                    "messageId": uuidv4(),
                    "correlationId": message.correlationId
                });
            }, 10);
        });
    }

    getStatus(messageId: string) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
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
            }, 10);
        })
    }
}
