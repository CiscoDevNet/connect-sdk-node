import {EmailType} from "./types";
import {isValidEmail} from "../../../helpers/validators";

export class WhatsappContactEmail {
    private _type: string | undefined;
    private _address: string | undefined;

    private emailTypeArr = [];
    private emailTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(EmailType)) {
            // @ts-ignore
            this.addrTypeArr.push(value);
        }

        for(let i = 0; i < this.emailTypeArr.length; i++) {
            this.emailTypeStrList += this.emailTypeArr[i];

            if(i < this.emailTypeArr.length) {
                this.emailTypeStrList += ", ";
            }
        }
    }

    get type() {return this._type}
    set type(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.addrTypeArr.includes(value)) {
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
}