import {AddressType} from "./types";

export class WhatsappContactAddr {
    private _type: string | undefined;
    private _street: string | undefined;
    private _city: string | undefined;
    private _state: string | undefined;
    private _zip: string | undefined;
    private _country: string | undefined;
    private _countryCode: string | undefined;

    private addrTypeArr = [];
    private addrTypeStrList = "";

    constructor() {
        for(const [key, value] of Object.entries(AddressType)) {
            // @ts-ignore
            this.addrTypeArr.push(value);
        }

        for(let i = 0; i < this.addrTypeArr.length; i++) {
            this.addrTypeStrList += this.addrTypeArr[i];

            if(i < this.addrTypeArr.length) {
                this.addrTypeStrList += ", ";
            }
        }
    }

    get type() {return this._type}
    set type(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.addrTypeArr.includes(value)) {
                throw Error(`Contact address type must be of type [${this.addrTypeStrList}]`);
            }

            this._type = value;
        }
    }

    get street() {return this._street}
    set street(value: string | undefined) {
        this._street = value;
    }

    get city() {return this._city}
    set city(value: string | undefined) {
        this._city = value;
    }

    get state() {return this._state}
    set state(value: string | undefined) {
        this._state = value;
    }

    get zip() {return this._zip}
    set zip(value: string | undefined) {
        this._zip = value;
    }

    get country() {return this._country}
    set country(value: string | undefined) {
        this._country = value;
    }

    get countryCode() {return this._countryCode}
    set countryCode(value: string | undefined) {
        this._countryCode = value;
    }

    toJSON() {
        const payload = {
            type: this.type,
            street: this.street,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country,
            countryCode: this.countryCode
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