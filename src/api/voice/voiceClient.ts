import request from "../../request";
import {VoiceCall} from "./voiceCall";
import {CpaasClient} from "../cpaasClient";
import {VoiceMessageResponse} from "./models/voiceMessageResponse";
import {VoiceCallResponse} from "./models/voiceCallResponse";
import {VoiceStatusResponse} from "./models/voiceStatusResponse";
import {RecordingResponse, VoiceRecordingResponse} from "./models/voiceRecordingResponse";

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

        return new Promise<VoiceMessageResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 202) {
                        let payload: any = {
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            sessions: new Array<object>()
                        }

                        /* istanbul ignore next */
                        if(body.sessions) {
                            body.sessions.forEach((session: any) => {
                                payload.sessions.push({
                                    sessionId: session.sessionId,
                                    status: session.status,
                                    dialedNumber: session.dialedNumber
                                });
                            });
                        }

                        resolve(payload);
                    } else if(res.statusCode >= 400 && res.statusCode <= 599) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        });
                    } else {
                        reject(res);
                    }
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

        return new Promise<VoiceCallResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 202) {
                        let payload: any = {
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            sessions: new Array<object>()
                        }

                        /* istanbul ignore next */
                        if(body.sessions) {
                            body.sessions.forEach((session: any) => {
                                payload.sessions.push({
                                    sessionId: session.sessionId,
                                    status: session.status,
                                    dialedNumber: session.dialedNumber
                                });
                            });
                        }

                        resolve(payload);
                    } else if(res.statusCode >= 400 && res.statusCode <= 599) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        });
                    } else {
                        reject(res);
                    }
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

        return new Promise<VoiceStatusResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        resolve({
                            statusCode: body.statusCode,
                            requestId: res.headers['request-id'],
                            sessionId: body.sessionId,
                            callerId: body.callerId,
                            dialedNumber: body.dialedNumber,
                            status: body.status,
                            correlationId: body.correlationId,
                            durationSeconds: body.durationSeconds,
                            offeredTime: body.offeredTime,
                            answeredTime: body.answeredTime
                        })
                    } else {
                        reject(res);
                    }
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

        return new Promise<VoiceRecordingResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {

                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        let payload: any = {
                            statusCode: body.statusCode,
                            requestId: res.headers['request-id'],
                            sessionId: body.sessionId,
                            recordings: new Array<RecordingResponse>()
                        }

                        /* istanbul ignore next */
                        if(body.recordings) {
                            body.recordings.forEach((recording: any) => {
                                payload.recordings.push({
                                    durationSeconds: recording.durationSeconds,
                                    url: recording.url
                                });
                            });
                        }

                        resolve(payload);
                    } else {
                        reject(res);
                    }
                });
        });
    }
}