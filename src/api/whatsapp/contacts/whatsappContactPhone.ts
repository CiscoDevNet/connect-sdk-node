import {PhoneType} from './types';
import {isValidE164} from "../../../helpers/validators";
import {concatTypes, typeToArr} from "../../../helpers/tools"

/**
 * Phone class that gets passed into a WhatsappContact phones array
 */

export class WhatsappContactPhone {
    /**
     * @remark string value for type field
     */
    private _type: string | undefined;
    /**
     * @remark string value for number field
     */
    private _number: string | undefined;
    /**
     * @remark string value for whatsAppId
     */
    private _whatsAppId: string | undefined;

    private phoneTypeArr: Array<string> = typeToArr(PhoneType);
    private phoneTypeStrList = concatTypes(this.phoneTypeArr);

    get type() {return this._type}
    set type(value: string | undefined) {
        // @ts-ignore
        if(!this.phoneTypeArr.includes(value)) {
            throw Error(`Contact phone type must be of type [${this.phoneTypeStrList}]`);
        }

        this._type = value;
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

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            type: this.type,
            number: this.number,
            whatsAppId: this.whatsAppId
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