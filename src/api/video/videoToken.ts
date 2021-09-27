import {uuidv4} from "../../helpers/identifiers";

/**
 * Video token object for creating a video token
 */
export class VideoToken {
    private _sessionId: string | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value
     * that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(sessionId: string) {
        this.sessionId = sessionId;
        this._idempotencyKey = uuidv4();
    }

    get sessionId():string | undefined {return this._sessionId}
    set sessionId(value: string | undefined) {
        if(!value || value === "") {
            throw Error("sessionId must be defined");
        }

        this._sessionId = value;
    }

    get idempotencyKey() {return this._idempotencyKey}

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            sessionId: this.sessionId
        };

        return payload;
    }
}