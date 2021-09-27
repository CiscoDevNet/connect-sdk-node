/**
 * Main class for all clients that accepts a value to set the bearer token.
 *
 *
 * @param bearerToken - Bearer token for the client that inherits the class
 */

export class CpaasClient {
    private _bearerToken: string = '';

    constructor(bearerToken: string) {
        this._bearerToken = bearerToken;
    }

    get bearerToken(): string {return this._bearerToken;}

    set bearerToken(token: string) {this._bearerToken = token;}
}
