export function isValidHttpUrl(value: string) {
    let url;

    try {
        url = new URL(value);
    } catch(e) {
        return false;
    }

    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes('.');
}

export function isValidISO8601(value: string) {
    const regEx: RegExp = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/);

    return regEx.test(value);
}

export function isValidE164(value: string) {
    const regEx: RegExp = new RegExp(/^\+[1-9]\d{10,14}$/);

    return regEx.test(value);
}

export function isNumeric(value: any) {
    if (typeof value != "string") {value = value.toString()};

    return !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
}

export function isBinary(value: any) {
    const regEx: RegExp = new RegExp(/\ufffd/);

    return regEx.test(value);
}

export function isArrayBool(value: any) {
    for (let i of value) {
        if (i !== 0 && i !== 1) return false;
    }
    return true;
}

export function hasUnicode(value: any) {
    const regEx: RegExp = new RegExp(/[^\u0000-\u00ff]/);

    return regEx.test(value);
}