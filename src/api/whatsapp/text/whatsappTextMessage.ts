import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164,
    isNumeric
} from "../../../helpers/validators";
import {SmsContentType} from "../../smsContentType";
import {SMS_CONTENT_MAXLEN} from "../../../config/constants";
import {WhatsappContentType} from "../../whatsappContentType";

export class WhatsappTextMessage {
    private _contentType: string = WhatsappContentType.TEXT;
    private _content: string = "";
    private _previewUrl: string | undefined = "";
    private _from: string = "";
    private _to: string = "";
    private _callbackUrl: string | undefined;
    private _callbackData: string | undefined;
    private _correlationId: string | undefined;
    private _substitutions: Array<object> | undefined;

    _idempotencyKey: string = "";

    constructor(from: string, to: string, content: string) {
        this.from = from;
        this.to = to;
        this.content = content;
        this._idempotencyKey = uuidv4();
    }

    get contentType(): string {return this._contentType;}

    get content(): string {return this._content;}
    set content(value: any) {
        if(this._contentType === SmsContentType.TEXT && value.length > SMS_CONTENT_MAXLEN) {
            throw Error(`content must be no more than ${SMS_CONTENT_MAXLEN} characters`);
        }

        this._content = value;
    }

    get previewUrl(): string | undefined {return this._previewUrl}
    set previewUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("previewUrl must be a valid URL");
        }

        this._callbackUrl = value;
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

    get callbackUrl(): string | undefined {return this._callbackUrl;}
    set callbackUrl(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
    }

    get callbackData(): string | undefined {return this._callbackData;}
    set callbackData(value: string | undefined) {this._callbackData = value;}

    get correlationId(): string | undefined {return this._correlationId;}
    set correlationId(value: string | undefined) {this._correlationId = value;}

    get substitutions(): Array<object> | undefined {return this._substitutions;}

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
