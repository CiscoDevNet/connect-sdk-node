import {uuidv4} from "../../helpers/identifiers";

/**
 * Video session object for creating a video session
 */

export class VideoSession {
    private _appId: string | undefined;
    private _name: string | undefined;

    /**
     * @remark A value that is used to prevent duplicate requests. API requests with an Idempotency-Key value
     * that has been used in the previous 1 hours will be rejected as a duplicate request.
     */
    private readonly _idempotencyKey: string = "";

    constructor(appId: string, name: string) {
        this.appId = appId;
        this.name = name;
        this._idempotencyKey = uuidv4();
    }

    get appId():string | undefined {return this._appId}
    set appId(value: string | undefined) {
        if(!value || value === "") {
            throw Error("appId must be defined");
        }

        this._appId = value;
    }

    get name():string | undefined {return this._name}
    set name(value: string | undefined) {
        if(!value || value === "") {
            throw Error("name must be defined");
        }

        this._name = value;
    }

    get idempotencyKey() {return this._idempotencyKey}

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            appId: this.appId,
            name: this.name
        };

        return payload;
    }
}