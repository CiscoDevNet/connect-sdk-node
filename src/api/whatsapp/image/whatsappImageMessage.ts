import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";

/**
 * Message class to construct a image object to send to a WhatsappClient
 */

export class WhatsappImageMessage {
    /**
     * @remark Identifies to Whatsapp that this is an image message
     */
    private _contentType: string = WhatsappContentType.IMAGE;
    /**
     * @remark URL pointing to media asset
     */
    private _url:string = "";
    /**
     * @remark The IANA media type of the content specified at the URL
     */
    private _mimeType: string = "";
    /**
     * @remark Sender ID that message should be sent from
     */
    private _from: string = "";
    /**
     * @remark A mobile device phone number in E.164 format that should receive the message
     */
    private _to: string = "";
    /**
     * @remark Text to be displayed by your asset on the device
     */
    private _caption: string | undefined;
    /**
     * @remark If provided, events related to the delivery of this message will be POSTed to this URL.
     */
    private _callbackUrl: string | undefined;
    /**
     * @remark Additional data that will be echoed back in all callback requests made to callbackUrl
     */
    private _callbackData: string | undefined;
    /**
     * @remark User defined ID that is assigned to an individual message
     */
    private _correlationId: string | undefined;
    /**
     * @remark Members of this object are used to replace placeholders within the content or template specified.
     */
    private _substitutions: Array<object> | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(from: string, to: string, url: string, mimeType: string) {
        this.from = from;
        this.to = to;
        this.url = url;
        this.mimeType = mimeType;
        this._idempotencyKey = uuidv4();
    }

    get contentType(): string {return this._contentType;}

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

    /**
     * Adds a substitution object to the substitution array
     *
     * @param name value indicating the name of the field for the substitution
     * @param value sets the value of the field for the substitution
     */

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

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            contentType: this.contentType,
            url: this.url,
            mimeType: this.mimeType,
            from: this.from,
            to: this.to,
            caption: this.caption,
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
            correlationId: this.correlationId,
            substitutions: this.substitutions
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
