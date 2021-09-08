import {uuidv4} from "../../helpers/identifiers";
import {isValidHttpUrl, isValidISO8601} from "../../helpers/validators";
import {ContentType} from "../contentType";
import {SMS_CONTENT_MAXLEN} from "../../config/constants";

export class SmsMessage {
    private _from: string = "";
    private _to: string = "";
    private _content: string = "";
    private _contentType: string = ContentType.TEXT;
    private _substitutions: Array<object> = [];
    private _correlationId: string = "";
    private _dltTemplateId: string = "";
    private _callbackUrl: string = "";
    private _callbackData: string = "";
    private _expireAt: string = "";

    private _idempotencyKey: string = "";

    constructor() {
        this._idempotencyKey = uuidv4();
    }

    get from(): string {return this._from;}
    set from(value: string) {this._from = value;}

    get to(): string {return this._to;}
    set to(value: string) {this._to = value;}

    get content(): string {return this._content;}
    set content(value: string) {
        if(value.length > SMS_CONTENT_MAXLEN) {
            throw Error(`Value must be no more than ${SMS_CONTENT_MAXLEN} characters`);
        } else {
            this._content = value;
        }
    }

    get contentType(): string {return this._contentType;}
    set contentType(value: string) {
        // @ts-ignore
        if(Object.values(ContentType).indexOf(value) === -1) {
            let contentTypes: string = "";
            const contentTypeEnt = Object.entries(ContentType);

            for(let i = 0; i < contentTypeEnt.length; i++ ) {
                // @ts-ignore
                const type = contentTypeEnt[i][1];

                contentTypes += `${type}`;

                if(i < contentTypeEnt.length - 1) {
                    contentTypes += ', ';
                }
            }

            throw Error(`contentType must be one of the following: '${contentTypes}'`);
        } else {
            this._contentType = value;
        }

    }

    get substitutions(): Array<object> {return this._substitutions;}

    get correlationId(): string {return this._correlationId;}
    set correlationId(value: string) {this._correlationId = value;}

    get dltTemplateId(): string {return this._dltTemplateId;}
    set dltTemplateId(value: string) {this._dltTemplateId = value;}

    get callbackUrl(): string {return this._callbackUrl;}
    set callbackUrl(value: string) {
        if(!isValidHttpUrl(value)) {
            throw Error("callbackUrl must be a valid URI");
        }

        this._callbackUrl = value;
    }

    get callbackData(): string {return this._callbackData;}
    set callbackData(value: string) {this._callbackData = value;}

    get expireAt(): string {return this._expireAt;}
    set expireAt(value: string) {
        if(!isValidISO8601(value)) {
            throw Error("expireAt must be a valid ISO 8601 value");
        }

        this._expireAt = value;
    }

    get idempotencyKey(): string {return this._idempotencyKey;}

    addSubstitution(name: string = "", value: string = "") {
        if(name === "") {
            throw Error("Name must be specified in substitution");
        }

        this._substitutions.push({[name]: value});
    }
}