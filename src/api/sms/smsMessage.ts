import {uuidv4} from "../../helpers/identifiers";
import {isValidHttpUrl, isValidISO8601, isValidE164, isNumeric} from "../../helpers/validators";
import {ContentType} from "../contentType";
import {SMS_CONTENT_MAXLEN} from "../../config/constants";

export class SmsMessage {
    private _from: string = "";
    private _to: string = "";
    private _content: string = "";
    private _contentType: string = ContentType.TEXT;
    private _substitutions: Array<object> | undefined;
    private _correlationId: string | undefined;
    private _dltTemplateId: string | undefined;
    private _callbackUrl: string | undefined;
    private _callbackData: string | undefined;
    private _expireAt: string | undefined;

    private _idempotencyKey: string = "";

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
        this._idempotencyKey = uuidv4();
    }

    get from(): string {return this._from;}
    set from(value: string) {
        if(!isNumeric(value)) {
            throw new Error("from must be a number or E.164 string");
        }

        this._from = value;
    }

    get to(): string {return this._to;}
    set to(value: string) {
        if(!isValidE164(value)) {
            throw Error("to must contain a valid E.164 value");
        }

        this._to = value;
    }

    get content(): string {return this._content;}
    set content(value: string) {
        if(value.length > SMS_CONTENT_MAXLEN) {
            throw Error(`content must be no more than ${SMS_CONTENT_MAXLEN} characters`);
        } else {
            this._content = value;
        }
    }

    get contentType(): string {return this._contentType;}

    get substitutions(): Array<object> | undefined {return this._substitutions;}

    get correlationId(): string | undefined {return this._correlationId;}
    set correlationId(value: string | undefined) {this._correlationId = value;}

    get dltTemplateId(): string | undefined {return this._dltTemplateId;}
    set dltTemplateId(value: string | undefined) {this._dltTemplateId = value;}

    get callbackUrl(): string | undefined {return this._callbackUrl;}
    set callbackUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
    }

    get callbackData(): string | undefined {return this._callbackData;}
    set callbackData(value: string | undefined) {this._callbackData = value;}

    get expireAt(): string | undefined {return this._expireAt;}
    set expireAt(value: string | undefined) {
        if(value && !isValidISO8601(value)) {
            throw Error("expireAt must be a valid ISO 8601 value");
        }

        this._expireAt = value;
    }

    get idempotencyKey(): string {return this._idempotencyKey;}

    addSubstitution(name: string, value: string) {
        if(name === "") {
            throw Error("name must be specified in substitution");
        }

        /* istanbul ignore next */
        if(!this._substitutions) {
            this._substitutions = [];
        }

        this._substitutions.push({[name]: value});
    }
}
