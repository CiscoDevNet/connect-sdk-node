import {AddressType} from "./types";
import {concatTypes, typeToArr} from "../../../helpers/tools"

/**
 * Address class that gets passed into a WhatsappContact address array
 */

export class WhatsappContactAddr {
    /**
     * @remark string value for type field
     */
    private _type: string | undefined;
    /**
     * @remark string value for street field
     */
    private _street: string | undefined;
    /**
     * @remark string value for city field
     */
    private _city: string | undefined;
    /**
     * @remark string value for state field
     */
    private _state: string | undefined;
    /**
     * @remark string value for zip field
     */
    private _zip: string | undefined;
    /**
     * @remark string value for country field
     */
    private _country: string | undefined;
    /**
     * @remark string value for countryCode field
     */
    private _countryCode: string | undefined;

    private addrTypeArr: Array<string> = typeToArr(AddressType);
    private addrTypeStrList = concatTypes(this.addrTypeArr);

    get type() {return this._type}
    set type(value: string | undefined) {
        // @ts-ignore
        if(!this.addrTypeArr.includes(value)) {
            throw Error(`Contact address type must be of type [${this.addrTypeStrList}]`);
        }

        this._type = value;
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

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

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