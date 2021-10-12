import {uuidv4} from "../../helpers/identifiers";
import {isValidE164, isValidHttpUrl} from "../../helpers/validators";
import {TtsAudio} from "./message/ttsAudio";
import {MediaAudio} from "./message/mediaAudio";
import {UrlAudio} from "./message/urlAudio";

/**
 * VoiceMessage is the data object used to send a voice message to the API
 */

export class VoiceMessage {
    /**
     * @remark The calling party number to use when placing the call to the dialed number
     */
    private _callerId: string = "";
    /**
     * @remark Array of numbers to dial and start call sessions with.
     */
    private _dialedNumber: string = "";
    /**
     * @remark TtsAudio or MediaAudio or UrlAudio object to send with voice message
     */
    private _audio: TtsAudio | MediaAudio | UrlAudio | undefined;

    /**
     * @remark URL for sending notifications after call gets completed or failed
     */
    private _callbackUrl: string | undefined;
    /**
     * @remark A user-provided arbitrary string value that will be stored with the call status and sent in all
     * callback events.
     */
    private _correlationId: string | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value
     * that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(callerId: string, dialedNumber: string) {
        this.callerId = callerId;
        this.dialedNumber = dialedNumber;
        this._idempotencyKey = uuidv4();
    }

    get callerId() {return this._callerId}
    set callerId(number: string) {
        if(!isValidE164(number)) {
            throw Error("Number must be a valid E.164 string");
        }

        this._callerId = number;
    }

    get dialedNumber(): string {return this._dialedNumber}

    set dialedNumber(number: string) {
        if(!isValidE164(number)) {
            throw Error("Number must be a valid E.164 string");
        }

        this._dialedNumber = number;
    }

    get audio(): TtsAudio | MediaAudio | UrlAudio | undefined {return this._audio}
    set audio(value: TtsAudio | MediaAudio | UrlAudio | undefined) {
        if(!value) {
            throw Error("Must provide a valid audio object");
        }

        this._audio = value;
    }

    get callbackUrl(): string | undefined {return this._callbackUrl;}
    set callbackUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
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
            audio: this.audio?.toJSON(),
            callbackUrl: this.callbackUrl,
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
