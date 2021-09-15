import {CpaasClient} from "../cpaasClient";
import request from "../../request";
import {WhatsappContactMessage} from "./contacts/whatsappContactMessage";
import {WhatsappContentType} from "./whatsappContentType";

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
            path: `/v1/whatsapp/messages/${messageId}`,
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

                    if(res.statusCode) {
                        if(res.statusCode === 200) {
                            if(body.contentType) {
                                if(body.contentType === WhatsappContentType.TEXT) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "content": body.content,
                                        "previewUrl": body.previewUrl,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime,
                                    }
                                }

                                if(body.contentType === WhatsappContentType.AUDIO) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "url": body.url,
                                        "mimeType": body.mimeType,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.IMAGE) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "url": body.url,
                                        "mimeType": body.mimeType,
                                        "caption": body.caption,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.VIDEO) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "url": body.url,
                                        "mimeType": body.mimeType,
                                        "caption": body.caption,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.DOCUMENT) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "fileName": body.fileName,
                                        "url": body.url,
                                        "mimeType": body.mimeType,
                                        "caption": body.caption,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.STICKER) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "url": body.url,
                                        "mimeType": body.mimeType,
                                        "messageId": body.messageType,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.LOCATION) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "latitude": body.latitude,
                                        "longitude": body.longitude,
                                        "name": body.name,
                                        "address": body.address,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }
                                }

                                if(body.contentType === WhatsappContentType.CONTACTS) {
                                    payload = {
                                        "contentType": body.contentType,
                                        "messageId": body.messageId,
                                        "acceptedTime": body.acceptedTime,
                                        "from": body.from,
                                        "contacts": new Array<object>(),
                                        "to": body.to,
                                        "status": body.status,
                                        "statusTime": body.statusTime
                                    }

                                    if(body.contacts && body.contacts.length > 0) {
                                        body.contacts.forEach((contact: any) => {
                                            const contactPush = {
                                                "formattedName": contact.formattedName,
                                                "namePrefix": contact.namePrefix,
                                                "firstName": contact.firstName,
                                                "middleName": contact.middleName,
                                                "lastName": contact.lastName,
                                                "nameSuffix": contact.nameSuffix,
                                                "birthday": contact.birthday,
                                                "company": contact.company,
                                                "department": contact.department,
                                                "title": contact.title,
                                                "phones": new Array<object>(),
                                                "addresses": new Array<object>(),
                                                "emails": new Array<object>(),
                                                "urls": new Array<object>()
                                            };

                                            if(contact.phones && contact.phones.length > 0) {
                                                contact.phones.forEach((phone: any) => {
                                                    contactPush.phones.push({
                                                        "type": phone.type,
                                                        "number": phone.number,
                                                        "whatsAppId": phone.whatsAppId
                                                    })
                                                })
                                            }

                                            if(contact.addresses && contact.addresses.length > 0) {
                                                contact.addresses.forEach((address: any) => {
                                                    contactPush.addresses.push({
                                                        "type": address.type,
                                                        "street": address.street,
                                                        "city": address.city,
                                                        "state": address.state,
                                                        "zip": address.zip,
                                                        "country": address.country,
                                                        "countryCode": address.countryCode
                                                    });
                                                })
                                            }

                                            if(contact.emails && contact.emails.length > 0) {
                                                contact.emails.forEach((email: any) => {
                                                    contactPush.emails.push({
                                                        "type": email.type,
                                                        "address": email.address
                                                    });
                                                })
                                            }

                                            if(contact.urls && contact.urls.length > 0) {
                                                contact.urls.forEach((url: any) => {
                                                    contactPush.urls.push({
                                                        "type": url.type,
                                                        "address": url.address
                                                    });
                                                })
                                            }

                                            payload.contacts.push(contactPush);
                                        })
                                    }
                                }
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
}
