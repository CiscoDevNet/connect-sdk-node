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