import {actionTypes} from "./actionTypes";

/**
 * Action class for sending a answer action back to the callback POST
 */

export class AnswerAction {
    /**
     * @remark Value indicating which action to invoke
     */
    private _action: string = actionTypes.ANSWER;

    get action():string {return this._action}

    toJSON() {
        return {
            action: this.action
        }
    }
}