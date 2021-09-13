import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164,
    isNumeric
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";

export class WhatsappDocMessage {
    private _contentType: string = WhatsappContentType.DOCUMENT;
    private _url:string = "";
    private _mimeType: string = "";
    private _from: string = "";
    private _to: string = "";

    private _fileName: string | undefined;
    private _caption: string | undefined;
    private _callbackUrl: string | undefined;
    private _callbackData: string | undefined;
    private _correlationId: string | undefined;
    private _substitutions: Array<object> | undefined;

    _idempotencyKey: string = "";

    constructor(from: string, to: string, url: string, mimeType: string) {
        this.from = from;
        this.to = to;
        this.url = url;
        this.mimeType = mimeType;
        this._idempotencyKey = uuidv4();
    }

    get contentType(): string {return this._contentType;}

    get fileName(): string | undefined {return this._fileName}
    set fileName(value: string | undefined) {this._fileName = value;}

    get url(): string {return this._url}
    set url(value: string) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("value for 'url' must be a valid URL");
        }

        this._url = value;
    }

    get mimeType(): string {return this._mimeType};
    set mimeType(value: string) {
        if(value === "") {
            throw new Error("mimeType must be defined");
        }

        this._mimeType = value;
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

    get caption(): string | undefined {return this._caption}
    set caption(value: string | undefined) {
        this._caption = value;
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
