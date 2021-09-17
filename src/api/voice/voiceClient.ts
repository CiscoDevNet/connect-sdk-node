import request from "../../request";
import {VoiceCall} from "./voiceCall";
import {CpaasClient} from "../cpaasClient";

/**
 * Client class for sending a voice message
 */

export class VoiceClient extends CpaasClient {

    /**
     * Sends an voice message
     *
     * @param message object for sending the message to the API
     * @returns request object sent back to the client as a promise
     */

    sendVoiceMessage(message: any) {
        if(!message.idempotencyKey || message.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a voice message");
        }

        if(!message.callerId || message.callerId === "") {
            throw Error("Must provide a 'callerId' value for sending a voice message");
        }

        if(!message.dialedNumber || message.dialedNumber.length < 1) {
            throw Error("Must provide at least one 'dialedNumber' for sending a voice message");
        }

        const options = {
            method: 'POST',
            path: '/v1/voice/messages',
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
                                sessions: new Array<object>()
                            }

                            if(body.sessions) {
                                body.sessions.forEach((session: any) => {
                                    payload.sessions.push({
                                        "sessionId": session.sessionId,
                                        "status": session.status,
                                        "dialedNumber": session.dialedNumber
                                    });
                                });
                            }
                        }

                        if(res.statusCode >= 400 && res.statusCode <= 599) {
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
        });
    }

    /**
     * Sends an voice call
     *
     * @param callData VoiceCall object for sending the call to the API
     * @returns request object sent back to the client as a promise
     */

    placeCall(callData: VoiceCall) {
        if(!callData.idempotencyKey || callData.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for sending a voice call");
        }

        if(!callData.callerId || callData.callerId === "") {
            throw Error("Must provide a 'callerId' value for sending a voice call");
        }

        if(!callData.dialedNumber || callData.dialedNumber.length < 1) {
            throw Error("Must provide at least one 'dialedNumber' for sending a voice call");
        }

        const options = {
            method: 'POST',
            path: '/v1/voice/calls',
            headers: {
                'Idempotency-Key': callData.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: callData.toJSON()
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
                                sessions: new Array<object>()
                            }

                            if(body.sessions) {
                                body.sessions.forEach((session: any) => {
                                    payload.sessions.push({
                                        "sessionId": session.sessionId,
                                        "status": session.status,
                                        "dialedNumber": session.dialedNumber
                                    });
                                });
                            }
                        }

                        if(res.statusCode >= 400 && res.statusCode <= 599) {
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
        });
    }


    /**
     * Retrieve status of an voice message
     *
     * @param sessionId String of the voice session Id
     * @returns request object sent back to the client as a promise
     */

    getStatus(sessionId: string) {
        const options = {
            method: 'GET',
            path: `/v1/voice/calls/${sessionId}`,
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
                            payload = {
                                "statusCode": body.statusCode,
                                "sessionId": body.sessionId,
                                "callerId": body.callerId,
                                "dialedNumber": body.dialedNumber,
                                "status": body.status,
                                "correlationId": body.correlationId,
                                "durationSeconds": body.durationSeconds,
                                "offeredTime": body.offeredTime,
                                "answeredTime": body.answeredTime
                            }
                        } else {
                            payload = res;
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
        });
    }

    /**
     * Retrieve information on any recordings taken during a call
     *
     * @param sessionId String of the voice session Id
     * @returns request object sent back to the client as a promise
     */

    getRecordings(sessionId: string) {
        const options = {
            method: 'GET',
            path: `/v1/voice/calls/${sessionId}/recordings`,
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
                            payload = {
                                statusCode: body.statusCode,
                                sessionId: body.sessionId,
                                recordings: new Array<object>()
                            }

                            if(body.recordings) {
                                body.recordings.forEach((recording: any) => {
                                    payload.recordings.push({
                                        "durationSeconds": recording.durationSeconds,
                                        "url": recording.url
                                    });
                                });
                            }
                        } else {
                            payload = res;
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
        });
    }
}