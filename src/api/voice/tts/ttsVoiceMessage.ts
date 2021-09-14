import {uuidv4} from "../../../helpers/identifiers";
import {isValidE164, isValidHttpUrl} from "../../../helpers/validators";
import {TtsVoiceAudio} from "./ttsVoiceAudio";

export class TtsVoiceMessage {
    private _callerId: string = "";
    private _dialedNumber: Array<string> = [];
    private _audio: TtsVoiceAudio | undefined;

    private _callbackUrl: string | undefined;
    private _correlationId: string | undefined;

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

    get dialedNumber(): Array<string> {return this._dialedNumber}

    addDialedNumber(number: string) {
        if(!isValidE164(number)) {
            throw Error("Number must be a valid E.164 string");
        }

        this._dialedNumber.push(number);
    }

    get audio(): TtsVoiceAudio | undefined {return this._audio}
    set audio(value: TtsVoiceAudio | undefined) {
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

    toJSON() {
        const payload = {
            callerId: this.callerId,
            dialedNumber: this.dialedNumber,
            audio: this.audio,
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
