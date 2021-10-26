/**
 * Validates that a passed string is a valid URL
 *
 * @returns boolean true/false if passed value is a valid URL
 */

export function isValidHttpUrl(value: string) {
    let url;

    try {
        url = new URL(value);
    } catch(e) {
        return false;
    }

    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes('.');
}

/**
 * Validates that a passed string is a valid Email
 *
 * @returns boolean true/false if passed value is a valid Email
 */

export function isValidEmail(value: string) {
    const regEx: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return regEx.test(value);
}

/**
 * Validates that a passed string is a valid E.164 (phone number) value
 *
 * @returns boolean true/false if passed value is a valid E.164 string
 */

export function isValidE164(value: string) {
    const regEx: RegExp = new RegExp(/^\+[1-9]\d{10,14}$/);

    return regEx.test(value);
}

/**
 * Validates that a passed string is a number
 *
 * @returns boolean true/false if passed value is a number
 */

export function isNumeric(value: any) {
    if (typeof value != "string") {value = value.toString()};

    return !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
}

/**
 * Validates that a passed string is a float
 *
 * @returns boolean true/false if passed value is a float
 */

export function isFloat(value: any) {
    return Number(value) === value && value % 1 !== 0;
}

/**
 * Validates that a passed string is boolean
 *
 * @returns boolean true/false if passed value is a boolean value
 */

export function isBoolean(value: any) {
    return 'boolean' === typeof value;
}

/**
 * Validates that a passed string has unicode characters
 *
 * @returns boolean true/false if passed value has unicode characters
 */

export function hasUnicode(value: any) {
    const regEx: RegExp = new RegExp(/[^\u0000-\u00ff]/);

    return regEx.test(value);
}