import {uuidv4} from "../../helpers/identifiers";
import {isBoolean, isFloat, isNumeric, isValidE164, isValidHttpUrl} from "../../helpers/validators";

/**
 * VoiceCall is the data object used to send a voice call to the API
 */

export class VoiceCall {
    /**
     * @remark The calling party number to use when placing the call to the dialed number
     */
    private _callerId: string = "";
    /**
     * @remark Array of numbers to dial and start call sessions with.
     */
    private _dialedNumber: string = "";

    /**
     * @remark URL for event callbacks that will provide the next actions for the call
     */
    private _callbackUrl: string | undefined;
    /**
     * @remark If present and a positive value, record the call for this many seconds. A value of 0 means to
     * record until the end of the call.
     */
    private _recordCallSeconds: number | undefined;
    /**
     * @remark if true, VoiceMailDetected event will be sent if call is answered by an Answering Machine.
     * PlayAction is expected in repsonse of this event.
     * @default FALSE
     */
    private _detectVoiceMail: boolean | undefined = false;
    /**
     * @remark A user-provided arbitrary string value that will be stored with the call status and sent in
     * all callback events.
     */
    private _correlationId: string | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value
     * that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(callerId: string) {
        this.callerId = callerId;
        this._idempotencyKey = uuidv4();
    }

    get callerId() {return this._callerId}
    set callerId(value: string) {
        if(!value || value === "") {
            throw Error("callerId value not provided");
        }

        this._callerId = value;
    }

    get dialedNumber(): string {return this._dialedNumber}

    set dialedNumber(number: string) {
        if(!isValidE164(number)) {
            throw Error("Number must be a valid E.164 string");
        }

        this._dialedNumber = number;
    }

    get callbackUrl(): string | undefined {return this._callbackUrl;}
    set callbackUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
    }

    get recordCallSeconds(): number | undefined {return this._recordCallSeconds}
    set recordCallSeconds(value: number | undefined) {
        if(value && (!isNumeric(value) || isFloat(value))) {
            throw Error("Value for recordCallSeconds must be an integer");
        }

        this._recordCallSeconds = value;
    }

    get detectVoiceMail(): boolean | undefined {return this._detectVoiceMail}
    set detectVoiceMail(value: boolean | undefined) {
        if(value && !isBoolean(value)) {
            throw Error("Value for detectVoiceMail must be a boolean value");
        }

        this._detectVoiceMail = value;
    }

    get correlationId(): string | undefined {return this._correlationId;}
    set correlationId(value: string | undefined) {this._correlationId = value;}

    get idempotencyKey(): string {return this._idempotencyKey;}

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            callerId: this.callerId,
            dialedNumber: this.dialedNumber,
            callbackUrl: this.callbackUrl,
            recordCallSeconds: this.recordCallSeconds,
            detectVoiceMail: this.detectVoiceMail,
            correlationId: this.correlationId
        };

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        return payload;
    }
}
