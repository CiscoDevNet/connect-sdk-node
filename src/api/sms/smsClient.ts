import {CpaasClient} from "../cpaasClient";
import {SmsMessage} from "./smsMessage";
import {uuidv4} from "../../helpers/identifiers";

export class SmsClient extends CpaasClient {
    sendMessage(message: SmsMessage) {
        const response = {
            "acceptedTime": "2021-07-29T13:45:33.404Z",
            "messageId": uuidv4(),
            "correlationId": message.correlationId
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response);
            }, 2000);
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
            }, 2000);
        })
    }
}
