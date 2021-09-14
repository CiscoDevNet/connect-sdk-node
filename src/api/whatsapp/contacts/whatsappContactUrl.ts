import {UrlType} from "./types";
import {isValidHttpUrl} from "../../../helpers/validators";

/**
 * URL class that gets passed into a WhatsappContact urls array
 */

export class WhatsappContactUrl {
    /**
     * @remark string value for type field
     */
    private _type: string | undefined;
    /**
     * @remark string value for address field
     */
    private _address: string | undefined;

    private urlTypeArr = [];
    private urlTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(UrlType)) {
            // @ts-ignore
            this.urlTypeArr.push(value);
        }

        for(let i = 0; i < this.urlTypeArr.length; i++) {
            this.urlTypeStrList += this.urlTypeArr[i];

            if(i < this.urlTypeArr.length) {
                this.urlTypeStrList += ", ";
            }
        }
    }

    get type() {return this._type}
    set type(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.urlTypeArr.includes(value)) {
                throw Error(`Contact URL type must be of type [${this.urlTypeStrList}]`);
            }

            this._type = value;
        }
    }

    get address() {return this._address}
    set address(value: string | undefined) {
        if(value && !isValidHttpUrl(value)) {
            throw Error("Contact url address must be a valid URL");
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