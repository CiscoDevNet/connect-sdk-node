import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164,
    isNumeric
} from "../../../helpers/validators";
import {WhatsappContentType} from "../whatsappContentType";

export class WhatsappTemplateMessage {
    private _from: string = "";
    private _to: string = "";
    private _callbackUrl: string | undefined;
    private _callbackData: string | undefined;
    private _correlationId: string | undefined;
    private _substitutions: Array<object> | undefined;
    private _contentType: string = WhatsappContentType.TEMPLATE;
    private _templateId: string | undefined;

    _idempotencyKey: string = "";

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

    toJSON() {
        const payload = {
            from: this.from,
            to: this.to,
            callbackUrl: this.callbackUrl,
            callbackData: this.callbackData,
            correlationId: this.correlationId,
            substitutions: this.substitutions,
            contentType: this.contentType,
            templateId: this.templateId
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
