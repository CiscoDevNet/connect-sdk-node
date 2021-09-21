import request from "../../request";
import {CpaasClient} from "../cpaasClient";
import {VideoSession} from "./videoSession";
import {VideoToken} from "./videoToken";
import {VideoCreateResponse} from "./models/videoCreateResponse";
import {VideoRetrieveResponse} from "./models/videoRetrieveResponse";
import {VideoDeleteResponse} from "./models/videoDeleteResponse";
import {VideoTokenResponse} from "./models/videoTokenResponse";

/**
 * Client class for sending a video request
 */
export class VideoClient extends CpaasClient {

    /**
     * Creates a video session
     *
     * @param videoSession object for sending the session data to the API
     * @returns request object sent back to the client as a promise
     */

    createSession(videoSession: VideoSession) {
        if(!videoSession.idempotencyKey || videoSession.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for creating a video session");
        }

        if(!videoSession.appId || videoSession.appId === "") {
            throw Error("Must provide an 'appId' value for creating a video session");
        }

        if(!videoSession.name || videoSession.name === "") {
            throw Error("Must provide a 'name' value for creating a video session");
        }

        const options = {
            method: 'POST',
            path: '/v1/video/sessions',
            headers: {
                'Idempotency-Key': videoSession.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: videoSession.toJSON()
        };

        return new Promise<VideoCreateResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 201) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            location: res.headers['location'],
                            sessionId: body.sessionId
                        });
                    } else if(res.statusCode >= 400 && res.statusCode <= 599) {
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
        });
    }

    /**
     * Retrieves a video session information
     *
     * @param sessionId value for retrieving the session data from the API
     * @returns request object sent back to the client as a promise
     */

    retrieveSession(sessionId: string) {
        const options = {
            method: 'GET',
            path: `/v1/video/sessions/${sessionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return new Promise<VideoRetrieveResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            appId: body.appId,
                            name: body.name,
                            sessionId: body.sessionId
                        })
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
     * Deletes a video session
     *
     * @param sessionId value to specify which session to delete
     * @returns request object sent back to the client as a promise
     */

    deleteSession(sessionId: string) {
        const options = {
            method: 'DELETE',
            path: `/v1/video/sessions/${sessionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            }
        };

        return new Promise<VideoDeleteResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = (res.body) ? JSON.parse(res.body) : {};

                    if(res.statusCode === 200) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id']
                        });
                    } else if(res.statusCode >= 400 && res.statusCode <= 599) {
                        reject({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            code: body.code,
                            message: body.message
                        });
                    } else {
                        /* istanbul ignore next */
                        reject(res);
                    }
                });
        });
    }

    /**
     * Creates a video token
     *
     * @param videoToken object for sending the token data to the API
     * @returns request object sent back to the client as a promise
     */

    createToken(videoToken: VideoToken) {
        if(!videoToken.idempotencyKey || videoToken.idempotencyKey === "") {
            throw Error("Must provide a 'idempotencyKey' value for creating a video token");
        }

        if(!videoToken.sessionId || videoToken.sessionId === "") {
            throw Error("Must provide an 'sessionId' value for creating a video token");
        }

        const options = {
            method: 'POST',
            path: `/v1/video/sessions/${videoToken.sessionId}/tokens`,
            headers: {
                'Idempotency-Key': videoToken.idempotencyKey,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.bearerToken}`
            },
            payload: videoToken.toJSON()
        };

        return new Promise<VideoTokenResponse>((resolve, reject) => {
            request(options)
                .then((res: any) => {
                    let payload: any;
                    // @ts-ignore
                    const body: any = JSON.parse(res.body);

                    if(res.statusCode === 200) {
                        resolve({
                            statusCode: res.statusCode,
                            requestId: res.headers['request-id'],
                            token: body.token,
                            expiresAt: body.expiresAt
                        });
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

}