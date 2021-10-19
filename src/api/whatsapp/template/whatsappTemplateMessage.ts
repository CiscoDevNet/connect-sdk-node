import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";
import {SubstitutionTypes} from "./substitutionTypes";

/**
 * Quick reply class for creating a creating a quick reply for whatsapp template message
 */

export class QuickReply {
    /**
     * @remark text to be displayed in the quick reply button
     */
    public _buttonText: string = "";
    /**
     * @remark payload to send with the button click
     */
    public _payload: string | undefined;

    constructor(buttonText: string, payload: string | undefined) {
        this._buttonText = buttonText;

        if(payload) {
            this._payload = payload;
        }
    }

    get buttonText(): string {return this._buttonText}
    get payload(): string | undefined {return this._payload}

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const content = {
            buttonText: this._buttonText,
            payload: this._payload
        }

        if(!content.payload) {
            delete content.payload;
        }

        return content;
    }
}

/**
 * TemplateSubstitution class to construct a substitution object to add to message object
 */

export class TemplateSubstitution {
    private readonly _variableName: string = "";

    private _contentType: string | undefined;
    private _isoString: string | undefined;
    private _fallbackValue: string | undefined;
    private _suffix: string | undefined;
    private _code: string | undefined;
    private _amount1000: string | undefined;
    private _content: string | undefined;

    constructor(name: string) {
        if(name === "") {
            throw Error("Must supply a name for the substitution");
        }

        this._variableName = name;
    }

    /**
     * Creates a datetime substitution object
     * @param isoString isoString to replace variable with
     * @param fallback fallback text
     */

    of_datetime(isoString: string, fallback: string) {
        this._contentType = SubstitutionTypes.DATETIME;
        this._isoString = isoString;
        this._fallbackValue = fallback;

        return this;
    }

    /**
     * Creates a url substitution object
     * @param suffix suffix after defined url in template
     */

    of_url(suffix: string) {
        this._contentType = SubstitutionTypes.URL;
        this._suffix = suffix;

        return this;
    }

    /**
     * Creates a currency substitution object
     * @param code currency code
     * @param amount1000 amount times 1000
     * @param fallback fallback text
     */

    of_currency(code: string, amount1000: string, fallback: string) {
        this._contentType = SubstitutionTypes.CURRENCY;
        this._code = code;
        this._amount1000 = amount1000;
        this._fallbackValue = fallback;

        return this;
    }

    /**
     * Creates a text substitution object
     * @param content text content to replace variable
     */

    of_text(content: string) {
        this._contentType = SubstitutionTypes.TEXT;
        this._content = content;

        return this;
    }

    /**
     * Returns object of fields for the API
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        return {
            name: this._variableName,
            contentType: this._contentType,
            isoString: this._isoString,
            fallbackValue: this._fallbackValue,
            suffix: this._suffix,
            code: this._code,
            amount1000: this._amount1000,
            content: this._content
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
    private _substitutions: object = {};
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
    private _quickReplies: Array<QuickReply> = [];

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

    get substitutions(): object | undefined {return this._substitutions;}

    get contentType(): string {return this._contentType;}

    get templateId() {return this._templateId}
    set templateId(value: string | undefined) {
        this._templateId = value;
    }

    get quickReplies(): Array<QuickReply> {return this._quickReplies}

    /**
     * Adds a quick reply to message
     *
     * @param buttonText Text to display on button
     * @param payload Payload to send with button click
     */

    addQuickReply(buttonText: string, payload: string | undefined) {
        if(!buttonText || buttonText === "") {
            throw Error("buttonText must be defined and can't be blank");
        }

        if(this._quickReplies.length >= 3) {
            throw Error("You can only have up to 3 quick reply entries");
        }

        // @ts-ignore
        this._quickReplies.push(new QuickReply(buttonText, payload).toJSON());
    }

    get idempotencyKey(): string {return this._idempotencyKey;}

    /**
     * Adds a substitution to message
     *
     * @param substitution TemplateSubstitution object to add to substitutions
     */

    addSubstitution(substitution: TemplateSubstitution) {
        const subJson = substitution.toJSON();

        const clearedSub = {
            [subJson.name]: {
                contentType: subJson.contentType,
                isoString: subJson.isoString,
                fallbackValue: subJson.fallbackValue,
                suffix: subJson.suffix,
                code: subJson.code,
                amount1000: subJson.amount1000,
                content: subJson.content
            }
        }

        for(const [key, value] of Object.entries(clearedSub[subJson.name])) {
            if(value === undefined) {
                // @ts-ignore
                delete clearedSub[subJson.name][key];
            }
        }

        // @ts-ignore
        this._substitutions = {
            ...this._substitutions,
            [subJson.name]: clearedSub[subJson.name]
        }
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
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
            correlationId: this.correlationId,
            substitutions: this.substitutions,
            contentType: this.contentType,
            templateId: this.templateId,
            quickReplies: this.quickReplies
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
