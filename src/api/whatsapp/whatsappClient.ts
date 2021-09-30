import request from "../../request";
import {WhatsappContentType} from "./whatsappContentType";
import {WhatsAppSendResponse} from "./models/whatsAppSendResponse";
import {WhatsAppStatusResponse} from "./models/whatsAppStatusResponse";
import {
    WhatsappContact,
    WhatsappContactUrl,
    WhatsappContactPhone,
    WhatsappContactEmail,
    WhatsappContactAddr
} from "./contacts";
import {API_VERSION} from "../../config/constants";
import {ClientConfiguration} from "../clientConfiguration";

/**
 * Client class for sending a Whatsapp message
 *
 * @param ClientConfiguration configuration for CPAAS client
 */

export class WhatsappClient {

    private readonly _clientConfiguration: ClientConfiguration;

    constructor(clientConfiguration: ClientConfiguration) {
        this._clientConfiguration = clientConfiguration;
    }

    get clientConfiguration(): ClientConfiguration {return this._clientConfiguration}

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

        if(message.contentType === WhatsappContentType.CONTACTS && (!message.contacts || message.contacts.length < 1)) {
            throw Error("Must provide at least one entry in 'contacts' value");
        }

        if(message.contentType === WhatsappContentType.CONTACTS && message.contacts && message.contacts.length > 0) {
            message.contacts.forEach((contact: WhatsappContact) => {
                if(!contact.formattedName) {
                    throw Error("Contacts need to include a 'formattedName' value");
                }

                if(
                    !contact.firstName &&
                    !contact.lastName &&
                    !contact.middleName &&
                    !contact.nameSuffix &&
                    !contact.namePrefix
                ) {
                    throw Error("Contacts must include at least a firstName, lastName, middleName, nameSuffix, or namePrefix");
                }
            })
        }

        const options = {
            method: 'POST',
            path: `/${API_VERSION}/whatsapp/messages`,
            headers: {
                'Idempotency-Key': message.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.clientConfiguration.bearerToken}`
            },
            payload: message.toJSON()
        };

        return new Promise<WhatsAppSendResponse>((resolve, reject) => {
            request(options, this.clientConfiguration)
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
                })
                .catch(err => {
                    reject(err);
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
                'Authorization': `Bearer ${this.clientConfiguration.bearerToken}`
            }
        };

        return new Promise<WhatsAppStatusResponse>((resolve, reject) => {
            request(options, this.clientConfiguration)
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

                                    if(contact.phones && contact.phones.length > 0) {
                                        contact.phones.forEach((phone: WhatsappContactPhone) => {
                                            contactPush.phones.push(<WhatsappContactPhone>{
                                                type: phone.type,
                                                number: phone.number,
                                                whatsAppId: phone.whatsAppId
                                            })
                                        })
                                    }

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

                                    if(contact.emails && contact.emails.length > 0) {
                                        contact.emails.forEach((email: WhatsappContactEmail) => {
                                            contactPush.emails.push(<WhatsappContactEmail>{
                                                type: email.type,
                                                address: email.address
                                            });
                                        })
                                    }

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
                })
                .catch(err => {
                    reject(err);
                });
        })
    }
}
