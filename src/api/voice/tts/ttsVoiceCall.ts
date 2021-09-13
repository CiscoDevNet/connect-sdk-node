import {uuidv4} from "../../../helpers/identifiers";
import {isBoolean, isNumeric, isValidE164, isValidHttpUrl} from "../../../helpers/validators";

export class TtsVoiceCall {
    private _callerId: string = "";
    private _dialedNumber: Array<string> = [];

    private _callbackUrl: string | undefined;
    private _recordCallSeconds: number | undefined;
    private _detectVoiceMail: boolean | undefined = false;
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

    get callbackUrl(): string | undefined {return this._callbackUrl;}
    set callbackUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
    }

    get recordCallSeconds(): number | undefined {return this._recordCallSeconds}
    set recordCallSeconds(value: number | undefined) {
        if(value && !isNumeric(value)) {
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
}
