import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";

/**
 * Quick reply class for creating a creating a quick reply for whatsapp template message
 */

export class QuickReply {
    /**
     * @remark type of the quick reply
     */
    public type: string = "contact";
    /**
     * @remark text to be displayed in the quick reply button
     */
    public buttonText: string = "";
    /**
     * @remark payload to send with the button click
     */
    public payload: string | undefined;

    constructor(buttonText: string, payload: string | undefined) {
        this.buttonText = buttonText;

        if(payload) {
            this.payload = payload;
        }
    }
}

/**
 * Message class to construct a template object to send to a WhatsappClient
 */

export class WhatsappTemplateMessage {
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
     * @remark Identifies to Whatsapp that this is an audio message
     */
    private _contentType: string = WhatsappContentType.TEMPLATE;
    /**
     * @remark Template ID for this message
     */
    private _templateId: string | undefined;

    /**
     * @remark Specifies a quick reply for message
     */
    private _quickReply: QuickReply | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    _idempotencyKey: string = "";

    constructor(from: string, to: string, templateId: string) {
        this.from = from;
        this.to = to;
        this.templateId = templateId;
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

    get contentType(): string {return this._contentType;}

    get templateId() {return this._templateId}
    set templateId(value: string | undefined) {
        this._templateId = value;
    }

    get quickReply() {return this._quickReply}

    addQuickReply(buttonText: string, payload: string | undefined) {
        if(!buttonText || buttonText === "") {
            throw Error("buttonText must be defined and can't be blank");
        }

        this._quickReply = new QuickReply(buttonText, payload);
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

        this._substitutions.push({[name]: value});
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        let quickReply;

        if(this.quickReply) {
            quickReply = {
                [this.quickReply.type]: {
                    "buttonText": this.quickReply.buttonText,
                    "payload": this.quickReply.payload
                }
            }

            if(this.quickReply.payload === undefined) {
                delete quickReply[this.quickReply.type].payload;
            }
        }

        const payload = {
            from: this.from,
            to: this.to,
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
            correlationId: this.correlationId,
            substitutions: this.substitutions,
            contentType: this.contentType,
            templateId: this.templateId,
            quickReply: quickReply
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
