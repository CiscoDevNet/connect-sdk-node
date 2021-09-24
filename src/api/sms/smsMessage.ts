import {uuidv4} from "../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidISO8601,
    isValidE164,
    isBinary,
    hasUnicode,
    isArrayBool
} from "../../helpers/validators";
import {SmsContentType} from "./smsContentType";
import {SMS_CONTENT_MAXLEN} from "../../config/constants";

/**
 * Message class to construct a message object to send to an SmsClient
*/

export class SmsMessage {
    /**
     * @remark Short or long code that the message should be sent from
     */
    private _from: string = "";
    /**
     * @remark The mobile device phone number in E.164 format that should receive the message
     */
    private _to: string = "";
    /**
     * @remark Denotes whether the content string is the actual text content to be sent or a reference to a template ID.
     */
    private _content: string = "";
    /**
     * @remark Denotes whether the content string is the actual text content to be sent or a reference to a template ID.
     */
    private _contentType: string = SmsContentType.TEXT;
    /**
     * @remark Members of this object are used to replace placeholders within the content or template specified.
     */
    private _substitutions: Array<object> | undefined;
    /**
     * @remark User defined ID that is assigned to an individual message
     */
    private _correlationId: string | undefined;
    /**
     * @remark Specifies the DLT template ID used for this message. This is only used in certain regions.
     */
    private _dltTemplateId: string | undefined;
    /**
     * @remark If provided, events related to the delivery of this message will be POSTed to this URL.
     */
    private _callbackUrl: string | undefined;
    /**
     * @remark Additional data that will be echoed back in all callback requests made to callbackUrl
     */
    private _callbackData: string | undefined;
    /**
     * @remark If the message has not been sent by this date & time, it will be removed from the sending queue
     */
    private _expireAt: string | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
        this._idempotencyKey = uuidv4();
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

    get content(): string {return this._content;}
    set content(value: any) {
        this._contentType = SmsContentType.TEXT;

        if(isBinary(value) || isArrayBool(value)) {
            this._contentType = SmsContentType.BINARY;
        } else if (hasUnicode(value)) {
            this._contentType = SmsContentType.UNICODE;
        }

        if(this._contentType === SmsContentType.TEXT && value.length > SMS_CONTENT_MAXLEN) {
            throw Error(`content must be no more than ${SMS_CONTENT_MAXLEN} characters`);
        }

        this._content = value;
    }

    set contentTemplateId(value: string) {
        if(value === "") {
            this._contentType = SmsContentType.TEXT;
        } else {
            this._contentType = SmsContentType.TEMPLATE;
        }

        this._content = value;
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
            from: this.from,
            to: this.to,
            content: this.content,
            contentType: this.contentType,
            substitutions: this.substitutions,
            correlationId: this.correlationId,
            dltTemplateId: this.dltTemplateId,
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
            expireAt: this.expireAt
        }

        for(const [key, value] of Object.entries(payload)) {
            if(value === undefined) {
                // @ts-ignore
                delete payload[key];
            }
        }

        return payload;
    }
}
