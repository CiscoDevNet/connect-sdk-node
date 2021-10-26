import {WhatsappContactPhone} from "./whatsappContactPhone";
import {WhatsappContactAddr} from "./whatsappContactAddr";
import {WhatsappContactEmail} from "./whatsappContactEmail";
import {WhatsappContactUrl} from "./whatsappContactUrl";

/**
 * Contact class that gets passed into a WhatsappContactMessage
 */

export class WhatsappContact {
    /**
     * @remark string value for formattedName
     */
    private _formattedName: string | undefined;
    /**
     * @remark string value for namePrefix
     */
    private _namePrefix: string | undefined;
    /**
     * @remark string value for firstName
     */
    private _firstName: string | undefined;
    /**
     * @remark string value for middleName
     */
    private _middleName: string | undefined;
    /**
     * @remark string value for lastName
     */
    private _lastName: string | undefined;
    /**
     * @remark string value for nameSuffix
     */
    private _nameSuffix: string | undefined;
    /**
     * @remark ISO8601 string value for birthday
     */
    private _birthday: string | undefined;
    /**
     * @remark string value for company
     */
    private _company:string | undefined;
    /**
     * @remark string value for department
     */
    private _department:string | undefined;
    /**
     * @remark string value for title
     */
    private _title:string | undefined;
    /**
     * @remark Array of WhatsappContactPhone objects
     */
    private _phones: Array<WhatsappContactPhone> = [];
    /**
     * @remark Array of WhatsappContactAddr objects
     */
    private _addresses: Array<WhatsappContactAddr> = [];
    /**
     * @remark Array of WhatsappContactEmail objects
     */
    private _emails: Array<WhatsappContactEmail> = [];
    /**
     * @remark Array of WhatsappContactUrl objects
     */
    private _urls: Array<WhatsappContactUrl> = [];

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
    set birthday(value: string | Date | undefined) {
        let birthday: Date;
        let birthdayFormatted: string | undefined;

        if(value) {
            if(value instanceof Date) {
                birthday = value;
            } else {
                birthday = new Date(value);
            }

            let year = birthday.getUTCFullYear(),
                month = (birthday.getUTCMonth() + 1).toString(),
                date = (birthday.getUTCDate()).toString();

            month = month.length < 2 ? `0${month}` : month;
            date = date.length < 2 ? `0${date}` : date;

            birthdayFormatted = `${year}-${month}-${date}`;

            if(birthdayFormatted.toLowerCase().includes("nan")) {
                throw Error("Birthday for contact is not a valid date");
            }
        }

        this._birthday = birthdayFormatted;
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

    /**
     * Adds a phone object to the phones array
     *
     * @param value accepts a WhatsappContactPhone object
     */

    addPhone(value: WhatsappContactPhone) {
        if(!value) {
            throw Error("Must provide a valid phone media to add to contacts");
        }

        // @ts-ignore
        this._phones.push(value.toJSON());
    }

    get addresses() {return this._addresses}

    /**
     * Adds a address object to the addresses array
     *
     * @param value accepts a WhatsappContactAddr object
     */

    addAddress(value: WhatsappContactAddr) {
        if(!value) {
            throw Error("Must provide a valid address media to add to contacts");
        }

        // @ts-ignore
        this._addresses.push(value.toJSON());
    }

    get emails() {return this._emails}

    /**
     * Adds a email object to the emails array
     *
     * @param value accepts a WhatsappContactEmail object
     */

    addEmail(value: WhatsappContactEmail) {
        if(!value) {
            throw Error("Must provide a valid email media to add to contacts");
        }

        // @ts-ignore
        this._emails.push(value.toJSON());
    }

    get urls() {return this._urls}

    /**
     * Adds a url object to the urls array
     *
     * @param value accepts a WhatsappContactUrl object
     */

    addUrl(value: WhatsappContactUrl) {
        if(!value) {
            throw Error("Must provide a valid url media to add to contacts");
        }

        // @ts-ignore
        this._urls.push(value.toJSON());
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            formattedName: this.formattedName,
            namePrefix: this.namePrefix,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            nameSuffix: this.nameSuffix,
            birthday: this.birthday,
            company: this.company,
            department: this.department,
            title: this.title,
            phones: this.phones,
            addresses: this.addresses,
            emails: this.emails,
            urls: this.urls
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