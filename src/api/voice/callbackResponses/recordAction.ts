import {actionTypes} from "./actionTypes";
import {UrlAudio} from "../message/urlAudio";
import {TtsAudio} from "../message/ttsAudio";
import {MediaAudio} from "../message/mediaAudio";
import {isFloat, isNumeric} from "../../../helpers/validators";

/**
 * Action class for sending a record action back to the callback POST
 */

export class RecordAction {
    /**
     * @remark Value indicating which action to invoke
     */
    private _action: string = actionTypes.RECORD;

    /**
     * @remark Array of audio objects to send with callback response
     */
    private _audio: Array<UrlAudio | TtsAudio | MediaAudio> | undefined;
    /**
     * @remark Stop recording after this many seconds
     */
    private _timeoutSeconds: number | undefined;
    /**
     * @remark Stop recording when the user presses this DTMF digit
     */
    private _terminationDigit: string | undefined;

    get action():string {return this._action}

    get audio(): Array<UrlAudio | TtsAudio | MediaAudio> | undefined {return this._audio}
    set audio(value: Array<UrlAudio | TtsAudio | MediaAudio> | undefined) {
        if(!value || value.length < 1) {
            throw Error("value for 'audio' must be an array with at least one entry");
        }

        this._audio = value;
    }

    get timeoutSeconds(): number | undefined {return this._timeoutSeconds}
    set timeoutSeconds(value: number | undefined) {
        if(value && (!isNumeric(value) || isFloat(value))) {
            throw Error("value for 'timeoutSeconds' must be an integer");
        }

        this._timeoutSeconds = value;
    }

    get terminationDigit():string | undefined {return this._terminationDigit}
    set terminationDigit(value: string | undefined) {
        this._terminationDigit = value;
    }

    toJSON() {
        const payload = {
            action: this.action,
            audio: this.audio,
            timeoutSeconds: this.timeoutSeconds,
            terminationDigit: this.terminationDigit
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