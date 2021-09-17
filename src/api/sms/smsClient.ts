import {CpaasClient} from "../cpaasClient";
import {SmsMessage} from "./smsMessage";
import request from "../../request/index";

/**
 * Client class for sending a SMS message
 */

export class SmsClient extends CpaasClient {

    /**
     * Sends an SMS message to a mobile device
     *
     * @param message SmsMessage object for sending the message to the API
     * @returns request object sent back to the client as a promise
     */

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

        const options = {
            method: 'POST',
            path: '/v1/sms/messages',
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: message.toJSON()
        };

        return new Promise((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode) {
                        if(res.statusCode === 202) {
                            payload = {
                                statusCode: res.statusCode,
                                acceptedTime: body.acceptedTime,
                                messageId: body.messageId,
                                correlationId: body.correlationId
                            }
                        }

                        if(res.statusCode === 400 || res.statusCode === 403 || res.statusCode === 500) {
                            payload = {
                                statusCode: res.statusCode,
                                code: body.code,
                                message: body.message
                            }
                        }
                    } else {
                        payload = res;
                    }

                    resolve(payload);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })

    }

    /**
     * Retrieve status of an SMS message
     *
     * @param messageId String of the SMS message Id
     * @returns request object sent back to the client as a promise
     */

    getStatus(messageId: string) {
        const options = {
            method: 'GET',
            path: `/v1/sms/messages/${messageId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return new Promise((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        payload = {
                            statusCode: res.statusCode,
                            messageId: body.messageId,
                            acceptedTime: body.acceptedTime,
                            from: body.from,
                            to: body.to,
                            correlationId: body.correlationId,
                            content: body.content,
                            contentType: body.contentType,
                            dltTemplateId: body.dltTemplateId,
                            status: body.status,
                            statusTime: body.statusTime
                        }

                        if(body.error) {
                            payload.error = body.error;
                        }
                    }

                    if(res.statusCode === 500) {
                        payload = {
                            statusCode: res.statusCode,
                            code: body.code,
                            message: body.message
                        }
                    }

                    resolve(payload);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })
    }
}
