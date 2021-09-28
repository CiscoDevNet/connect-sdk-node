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