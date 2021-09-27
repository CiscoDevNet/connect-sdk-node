import {EmailType} from "./types";
import {isValidEmail} from "../../../helpers/validators";

/**
 * Email class that gets passed into a WhatsappContact emails array
 */

export class WhatsappContactEmail {
    /**
     * @remark string value for type field
     */
    private _type: string | undefined;
    /**
     * @remark string value for address field
     */
    private _address: string | undefined;

    private emailTypeArr = [];
    private emailTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(EmailType)) {
            // @ts-ignore
            this.emailTypeArr.push(value);
        }

        for(let i = 0; i < this.emailTypeArr.length; i++) {
            this.emailTypeStrList += this.emailTypeArr[i];

            /* istanbul ignore next */
            if(i < this.emailTypeArr.length) {
                this.emailTypeStrList += ", ";
            }
        }
    }

    get type() {return this._type}
    set type(value: string | undefined) {
        /* istanbul ignore next */
        if(value) {
            // @ts-ignore
            if(!this.emailTypeArr.includes(value)) {
                throw Error(`Contact email type must be of type [${this.emailTypeStrList}]`);
            }

            this._type = value;
        }
    }

    get address() {return this._address}
    set address(value: string | undefined) {
        if(value && !isValidEmail(value)) {
            throw Error("Contact email address must be a valid email address");
        }

        this._address = value;
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            type: this.type,
            address: this.address
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