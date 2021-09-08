/**
 * class for CPAAS Client
 * @param {string} _bearerToken: Sets the bearer token for client requests to the API
 */

export class CpaasClient {
    private _bearerToken: string = '';

    constructor(bearerToken: string) {
        this._bearerToken = bearerToken;
    }

    get bearerToken(): string {return this._bearerToken;}

    set bearerToken(token: string) {this._bearerToken = token;}
}
