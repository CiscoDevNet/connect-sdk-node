import {API_SANDBOX_URL} from "../config/constants";

/**
 * Configuration class for CPAAS clients
 *
 *
 * @param bearerToken - Bearer token for the client that inherits the class
 * @param baseUrl - URL object containing the base url for the API
 */

export class ClientConfiguration {
    private _bearerToken: string = '';
    // @ts-ignore
    private _baseUrl: URL;
    private _hostname: string | undefined;
    private _hostPort: string | undefined;

    constructor(bearerToken: string, baseUrl: URL) {
        this.bearerToken = bearerToken;
        this.baseUrl = baseUrl;
    }

    get bearerToken(): string {return this._bearerToken;}

    set bearerToken(token: string) {this._bearerToken = token;}

    get baseUrl(): URL {return this._baseUrl}
    set baseUrl(url: URL) {
        this._baseUrl = url;

        if(url.protocol !== "http:" && url.protocol !== "https:") {
            throw Error("Protocol of 'hostnameOverwrite' must be either http or https");
        }

        if(url.port && url.port !== "") {
            this._hostPort = url.port;
        } else {
            this._hostPort = (url.protocol === "http:") ? '80' : '443'
        }

        this._hostname = url.hostname;
    }

    get hostPort(): string | undefined {return this._hostPort}

    /**
     * Sets the API base URL to the sandbox environment
     */
    sandboxed() {
        this.baseUrl = new URL(API_SANDBOX_URL);
    }
}
