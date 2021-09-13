import {PhoneType} from './types/phone';
import {isValidE164} from "../../../helpers/validators";

export class WhatsappContactPhone {
    private _type: string | undefined;
    private _number: string | undefined;
    private _whatsAppId: string | undefined;

    private phoneTypeArr = [];
    private phoneTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(PhoneType)) {
            // @ts-ignore
            this.phoneTypeArr.push(value);
        }

        for(let i = 0; i < this.phoneTypeArr.length; i++) {
            this.phoneTypeStrList += this.phoneTypeArr[i];

            if(i < this.phoneTypeArr.length) {
                this.phoneTypeStrList += ", ";
            }
        }
    }

    get type() {return this._type}
    set type(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.phoneTypeArr.includes(value)) {
                throw Error(`Contact phone type must be of type [${this.phoneTypeStrList}]`);
            }

            this._type = value;
        }
    }

    get number() {return this._number}
    set number(value: string | undefined) {
        if(value && !isValidE164(value)) {
            throw Error("Contact phone number must be a valid E.164 string");
        }

        this._number = value;
    }

    get whatsAppId() {return this._whatsAppId}
    set whatsAppId(value: string | undefined) {
        this._whatsAppId = value;
    }
}