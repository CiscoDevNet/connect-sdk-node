import {actionTypes} from "./actionTypes";

/**
 * Action class for sending a hangup action back to the callback POST
 */

export class HangupAction {
    /**
     * @remark Value indicating which action to invoke
     */
    private _action: string = actionTypes.HANGUP;
    /**
     * @remark An optional reason to be logged for disconnecting the call
     */
    private _reason: string | undefined;

    constructor(reason?: string | undefined) {
        if(reason) {
            this.reason = reason;
        }
    }

    get action(): string {return this._action}

    get reason(): string | undefined {return this._reason}
    set reason(value: string | undefined) {this._reason = value}

    toJSON() {
        const payload = {
            action: this.action,
            reason: this.reason
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