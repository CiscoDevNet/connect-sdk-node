import {SmsMessage} from "./smsMessage";
import request from "../../request/index";
import {SmsSendResponse} from "./models/smsSendResponse";
import {SmsStatusResponse} from "./models/smsStatusResponse";
import {API_VERSION} from "../../config/constants";
import {ClientConfiguration} from "../clientConfiguration";

/**
 * Client class for sending a SMS message
 *
 * @param ClientConfiguration configuration for CPAAS client
 */

export class SmsClient {
    private readonly _clientConfiguration: ClientConfiguration;

    constructor(clientConfiguration: ClientConfiguration) {
        this._clientConfiguration = clientConfiguration;
    }

    get clientConfiguration(): ClientConfiguration {return this._clientConfiguration}

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

        if((!message.content || message.content === "") && !message.binaryContent) {
            throw Error("Must provide a 'content', or 'binaryContent' value for sending a message");
        }

        const options = {
            method: 'POST',
            path: `/${API_VERSION}/sms/messages`,
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.clientConfiguration.bearerToken}`
            },
            payload: message.toJSON()
        };

        return new Promise<SmsSendResponse>((resolve, reject) => {
            const rejectCodes = [400, 403, 500];

            request(options, this.clientConfiguration)
                .then((res: any) => {
                    const body: any = (res.body && res.body !== "") ? JSON.parse(res.body) : {};

                    if(res.statusCode === 202) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            acceptedTime: body.acceptedTime,
                            messageId: body.messageId,
                            correlationId: body.correlationId
                        })
                    } else if(rejectCodes.includes(res.statusCode)) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        });
                    } else {
                        reject(res);
                    }
                })
                .catch(err => {
                    reject(err);
                });
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
            path: `/${API_VERSION}/sms/messages/${messageId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.clientConfiguration.bearerToken}`
            }
        };

        return new Promise<SmsStatusResponse>((resolve, reject) => {
            request(options, this.clientConfiguration)
                .then((res: any) => {
                    const body: any = (res.body && res.body !== "") ? JSON.parse(res.body) : {};

                    if(res.statusCode === 200) {
                        const payload: SmsStatusResponse = {
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            messageId: body.messageId,
                            acceptedTime: body.acceptedTime,
                            from: body.from,
                            to: body.to,
                            correlationId: body.correlationId,
                            content: body.content,
                            contentType: body.contentType,
                            dltTemplateId: body.dltTemplateId,
                            status: body.status,
                            statusTime: body.statusTime,
                            error: {}
                        }

                        if(body.error) {
                            payload.error = body.error;
                        }

                        resolve(payload);
                    } else if(res.statusCode === 500) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        })
                    }else if (res.statusCode === 404) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id']
                        })
                    } else {
                        reject(res);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}
