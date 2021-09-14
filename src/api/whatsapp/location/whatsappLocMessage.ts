import {uuidv4} from "../../../helpers/identifiers";
import {
    isValidHttpUrl,
    isValidE164,
    isNumeric
} from "../../../helpers/validators";
import {SmsContentType} from "../../sms/smsContentType";
import {SMS_CONTENT_MAXLEN} from "../../../config/constants";
import {WhatsappContentType} from "../whatsappContentType";

export class WhatsappLocMessage {
    private _contentType: string = WhatsappContentType.LOCATION;
    private _latitude: number | undefined;
    private _longitude: number | undefined;
    private _from: string = "";
    private _to: string = "";

    private _name: string | undefined;
    private _address: string | undefined;
    private _callbackUrl: string | undefined;
    private _callbackData: string | undefined;
    private _correlationId: string | undefined;
    private _substitutions: Array<object> | undefined;

    _idempotencyKey: string = "";

    constructor(from: string, to: string, lat:number, long: number) {
        this.latitude = lat;
        this.longitude = long;
        this.from = from;
        this.to = to;
        this._idempotencyKey = uuidv4();
    }

    get contentType(): string {return this._contentType;}

    get latitude(): number | undefined {return this._latitude};
    set latitude(value: number | undefined) {
        if(value === undefined || !isNumeric(value)) {
            throw Error("Latitude must be a number<double>");
        }

        this._latitude = value;
    }

    get longitude(): number | undefined {return this._longitude};
    set longitude(value: number | undefined) {
        if(value === undefined || !isNumeric(value)) {
            throw Error("Longitude must be a number<double>");
        }

        this._longitude = value;
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

    get name(): string | undefined {return this._name}
    set name(value: string | undefined) {this._name = value}

    get address(): string | undefined {return this._address}
    set address(value: string | undefined) {this._address = value}

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

    toJSON() {
        const payload = {
            from: this.from,
            to: this.to,
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
            address: this.address,
            contentType: this.contentType,
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
