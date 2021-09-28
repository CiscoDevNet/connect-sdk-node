/**
 * Converts a byte array to hex
 *
 * @returns string hex value converted from byte array
 */

export function byteArrToHex(byteArray: any) {
    return Array.from(byteArray, (byte: any) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}

/**
 * Takes an enum list and converts it to an Array<string>
 *
 * @returns Array<string> array representation of enum list
 */

export function typeToArr(list: any) {
    const listArr: Array<string> = [];

    for(const [key, value] of Object.entries(list)) {
        // @ts-ignore
        listArr.push(value);
    }

    return listArr;
}

/**
 * Takes an Array<string> and converts it to a comma delimited list
 *
 * @returns string comma delimited list of array
 */

export function concatTypes(listArr: Array<string>) {
    let listStr = "";

    for(let i = 0; i < listArr.length; i++) {
        // @ts-ignore
        listStr += listArr[i];

        if(i < listArr.length - 1) {
            listStr += ", ";
        }
    }

    return listStr;
}