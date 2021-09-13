import {UrlType} from "./types";
import {isValidHttpUrl} from "../../../helpers/validators";

export class WhatsappContactUrl {
    private _type: string | undefined;
    private _address: string | undefined;

    private urlTypeArr = [];
    private urlTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(UrlType)) {
            // @ts-ignore
            this.addrTypeArr.push(value);
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
            if(!this.addrTypeArr.includes(value)) {
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
}