import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164,
    isBoolean
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";

/**
 * Message class to construct a text object to send to a WhatsappClient
 */

export class WhatsappTextMessage {
    /**
     * @remark Identifies to Whatsapp that this is an text message
     */
    private _contentType: string = WhatsappContentType.TEXT;
    /**
     * @remark The text of the text message, which can contain URLs and formatting
     */
    private _content: string = "";
    /**
     * @remark Provides a preview of a URL included in the text message body
     * @default FALSE
     */
    private _previewUrl: boolean | undefined = false;
    /**
     * @remark Sender ID that message should be sent from
     */
    private _from: string = "";
    /**
     * @remark A mobile device phone number in E.164 format that should receive the message
     */
    private _to: string = "";
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
    private _substitutions: Array<object> = [];

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(from: string, to: string, content: string) {
        this.from = from;
        this.to = to;
        this.content = content;
        this._idempotencyKey = uuidv4();
    }

    get contentType(): string {return this._contentType;}

    get content(): string {return this._content;}
    set content(value: string) {
        this._content = value.toString();
    }

    get previewUrl(): boolean | undefined {return this._previewUrl}
    set previewUrl(value: boolean | undefined) {
        if(value && !isBoolean(value)) {
            throw Error("previewUrl must be a boolean value");
        }

        this._previewUrl = value;
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

        this._substitutions.push({[name]: value});
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            from: this.from,
            to: this.to,
            content: this.content,
            previewUrl: this.previewUrl,
            contentType: this.contentType,
            substitutions: this.substitutions,
            correlationId: this.correlationId,
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
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
