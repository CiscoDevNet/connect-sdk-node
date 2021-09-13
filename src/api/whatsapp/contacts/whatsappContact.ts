import {WhatsappContactPhone} from "./whatsappContactPhone";
import {isValidISO8601} from "../../../helpers/validators";
import {WhatsappContactAddr} from "./whatsappContactAddr";
import {WhatsappContactEmail} from "./whatsappContactEmail";
import {WhatsappContactUrl} from "./whatsappContactUrl";

export class WhatsappContact {
    private _formattedName: string | undefined;
    private _namePrefix: string | undefined;
    private _firstName: string | undefined;
    private _middleName: string | undefined;
    private _lastName: string | undefined;
    private _nameSuffix: string | undefined;
    private _birthday: string | undefined;
    private _company:string | undefined;
    private _department:string | undefined;
    private _title:string | undefined;
    private _phones: Array<WhatsappContactPhone> | undefined;
    private _addresses: Array<WhatsappContactAddr> | undefined;
    private _emails: Array<WhatsappContactEmail> | undefined;
    private _urls: Array<WhatsappContactUrl> | undefined;

    get formattedName() {return this._formattedName}
    set formattedName(value: string | undefined) {
        this._formattedName = value;
    }

    get namePrefix() {return this._namePrefix}
    set namePrefix(value: string | undefined) {
        this._namePrefix = value;
    }

    get firstName() {return this._firstName}
    set firstName(value: string | undefined) {
        this._firstName = value;
    }

    get middleName() {return this._middleName}
    set middleName(value: string | undefined) {
        this._middleName = value;
    }

    get lastName() {return this._lastName}
    set lastName(value: string | undefined) {
        this._lastName = value;
    }

    get nameSuffix() {return this._nameSuffix}
    set nameSuffix(value: string | undefined) {
        this._nameSuffix = value;
    }

    get birthday() {return this._birthday}
    set birthday(value: string | undefined) {
        if(value && !isValidISO8601(value)) {
            throw Error("Contact birthday must be in a valid ISO8601 format");
        }
    }

    get company() {return this._company}
    set company(value: string | undefined) {
        this._company = value;
    }

    get department() {return this._department}
    set department(value: string | undefined) {
        this._department = value;
    }

    get title() {return this._title}
    set title(value: string | undefined) {
        this._title = value;
    }

    get phones() {return this._phones}
    addPhone(value: WhatsappContactPhone) {
        if(!value) {
            throw Error("Must provide a valid phone object to add to contacts");
        }

        // @ts-ignore
        this._phones.push(value);
    }

    get addresses() {return this._addresses}
    addAddress(value: WhatsappContactAddr) {
        if(!value) {
            throw Error("Must provide a valid address object to add to contacts");
        }

        // @ts-ignore
        this._addresses.push(value);
    }

    get emails() {return this._emails}
    addEmail(value: WhatsappContactEmail) {
        if(!value) {
            throw Error("Must provide a valid email object to add to contacts");
        }

        // @ts-ignore
        this._emails.push(value);
    }

    get urls() {return this._urls}
    addUrl(value: WhatsappContactUrl) {
        if(!value) {
            throw Error("Must provide a valid url object to add to contacts");
        }

        // @ts-ignore
        this._urls.push(value);
    }
}