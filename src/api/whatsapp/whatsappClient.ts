import {CpaasClient} from "../cpaasClient";
import request from "../../request";
import {WhatsappContentType} from "./whatsappContentType";
import {WhatsAppSendResponse} from "./models/whatsAppSendResponse";
import {WhatsAppStatusResponse} from "./models/whatsAppStatusResponse";
import {WhatsappContact} from "./contacts/whatsappContact";
import {WhatsappContactPhone} from "./contacts/whatsappContactPhone";
import {WhatsappContactAddr} from "./contacts/whatsappContactAddr";
import {WhatsappContactEmail} from "./contacts/whatsappContactEmail";
import {WhatsappContactUrl} from "./contacts/whatsappContactUrl";
import {API_VERSION} from "../../config/constants";

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
            path: `/${API_VERSION}/whatsapp/messages`,
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: message.toJSON()
        };

        return new Promise<WhatsAppSendResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);
                    const rejectCodes = [400, 403, 500];

                    if(res.statusCode === 202) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            acceptedTime: body.acceptedTime,
                            messageId: body.messageId,
                            correlationId: body.correlationId
                        });
                    } else if(rejectCodes.includes(res.statusCode)) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        })
                    } else {
                        reject(res);
                    }
                });
        })
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
            path: `/${API_VERSION}/whatsapp/messages/${messageId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return new Promise<WhatsAppStatusResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        if(body.contentType === WhatsappContentType.TEXT) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                content: body.content,
                                previewUrl: body.previewUrl,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime,
                            }
                        }

                        if(body.contentType === WhatsappContentType.AUDIO) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                url: body.url,
                                mimeType: body.mimeType,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.IMAGE) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                url: body.url,
                                mimeType: body.mimeType,
                                caption: body.caption,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.VIDEO) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                url: body.url,
                                mimeType: body.mimeType,
                                caption: body.caption,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.DOCUMENT) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                fileName: body.fileName,
                                url: body.url,
                                mimeType: body.mimeType,
                                caption: body.caption,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.STICKER) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                url: body.url,
                                mimeType: body.mimeType,
                                messageId: body.messageType,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.LOCATION) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                latitude: body.latitude,
                                longitude: body.longitude,
                                name: body.name,
                                address: body.address,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }
                        }

                        if(body.contentType === WhatsappContentType.CONTACTS) {
                            payload = {
                                statusCode: res.statusCode,
                                requestId: res.headers['request-id'],
                                contentType: body.contentType,
                                messageId: body.messageId,
                                acceptedTime: body.acceptedTime,
                                from: body.from,
                                contacts: new Array<WhatsappContact>(),
                                to: body.to,
                                status: body.status,
                                statusTime: body.statusTime
                            }

                            if(body.contacts && body.contacts.length > 0) {
                                body.contacts.forEach((contact: WhatsappContact) => {
                                    const contactPush = {
                                        formattedName: contact.formattedName,
                                        namePrefix: contact.namePrefix,
                                        firstName: contact.firstName,
                                        middleName: contact.middleName,
                                        lastName: contact.lastName,
                                        nameSuffix: contact.nameSuffix,
                                        birthday: contact.birthday,
                                        company: contact.company,
                                        department: contact.department,
                                        title: contact.title,
                                        phones: new Array<WhatsappContactPhone>(),
                                        addresses: new Array<WhatsappContactAddr>(),
                                        emails: new Array<WhatsappContactEmail>(),
                                        urls: new Array<WhatsappContactUrl>()
                                    };

                                    /* istanbul ignore next */
                                    if(contact.phones && contact.phones.length > 0) {
                                        contact.phones.forEach((phone: WhatsappContactPhone) => {
                                            contactPush.phones.push(<WhatsappContactPhone>{
                                                type: phone.type,
                                                number: phone.number,
                                                whatsAppId: phone.whatsAppId
                                            })
                                        })
                                    }

                                    /* istanbul ignore next */
                                    if(contact.addresses && contact.addresses.length > 0) {
                                        contact.addresses.forEach((address: WhatsappContactAddr) => {
                                            contactPush.addresses.push(<WhatsappContactAddr>{
                                                type: address.type,
                                                street: address.street,
                                                city: address.city,
                                                state: address.state,
                                                zip: address.zip,
                                                country: address.country,
                                                countryCode: address.countryCode
                                            });
                                        })
                                    }

                                    /* istanbul ignore next */
                                    if(contact.emails && contact.emails.length > 0) {
                                        contact.emails.forEach((email: WhatsappContactEmail) => {
                                            contactPush.emails.push(<WhatsappContactEmail>{
                                                type: email.type,
                                                address: email.address
                                            });
                                        })
                                    }

                                    /* istanbul ignore next */
                                    if(contact.urls && contact.urls.length > 0) {
                                        contact.urls.forEach((url: WhatsappContactUrl) => {
                                            contactPush.urls.push(<WhatsappContactUrl>{
                                                type: url.type,
                                                address: url.address
                                            });
                                        })
                                    }

                                    payload.contacts.push(contactPush);
                                })
                            }
                        }

                        if(body.error) {
                            payload.error = body.error;
                        }

                        resolve(payload);
                    } else if(res.statusCode === 404) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id']
                        })
                    } else if(res.statusCode === 500) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        })
                    } else {
                        reject(res);
                    }
                });
        })
    }
}
