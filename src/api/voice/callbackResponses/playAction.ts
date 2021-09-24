import {actionTypes} from "./actionTypes";
import {UrlAudio} from "../message/urlAudio";
import {TtsAudio} from "../message/ttsAudio";
import {MediaAudio} from "../message/mediaAudio";
import {isBoolean, isFloat, isNumeric} from "../../../helpers/validators";

/**
 * Action class for sending a play action back to the callback POST
 */

export class PlayAction {
    /**
     * @remark Value indicating which action to invoke
     */
    private _action: string = actionTypes.PLAY;

    /**
     * @remark Record call audio
     */
    private _recordCall: boolean = false;
    /**
     * @remark Array of audio objects to send with callback response
     */
    private _audio: Array<UrlAudio | TtsAudio | MediaAudio> | undefined;
    /**
     * @remark If positive, allow caller to enter this many DTMF digits from the phone keypad
     */
    private _maxDigits: number | undefined;
    /**
     * @remark Stop collecting digits if this many seconds elapses without additional digits being entered
     */
    private _digitTimeout: number | undefined;
    /**
     * @remark If present, allow a caller to terminate their DTMF digit entry by pressing this character. Note,
     * this is a string to accomodate '#' and '*' digits.
     */
    private _terminationDigit: string | undefined;

    get action():string {return this._action}

    get recordCall():boolean {return this._recordCall}
    set recordCall(value: boolean) {
        if(value && !isBoolean(value)) {
            throw Error("Value for 'recordCall' must be a boolean");
        }

        this._recordCall = value;
    }

    get audio(): Array<UrlAudio | TtsAudio | MediaAudio> | undefined {return this._audio}
    set audio(value: Array<UrlAudio | TtsAudio | MediaAudio> | undefined) {
        if(!value || value.length < 1) {
            throw Error("value for 'audio' must be an array with at least one entry");
        }

        this._audio = value;
    }

    get maxDigits(): number | undefined {return this._maxDigits}
    set maxDigits(value: number | undefined) {
        if(value && (!isNumeric(value) || isFloat(value))) {
            throw Error("value for 'maxDigits' must be an integer");
        }

        this._maxDigits = value;
    }

    get digitTimeout(): number | undefined {return this._digitTimeout}
    set digitTimeout(value: number | undefined) {
        if(value && (!isNumeric(value) || isFloat(value))) {
            throw Error("value for 'digitTimeout' must be an integer");
        }

        this._digitTimeout = value;
    }

    get terminationDigit(): string | undefined {return this._terminationDigit}
    set terminationDigit(value: string | undefined) {
        this._terminationDigit = value;
    }

    toJSON() {
        const payload = {
            action: this.action,
            recordCall: this.recordCall,
            audio: this.audio,
            maxDigits: this.maxDigits,
            digitTimeout: this.digitTimeout,
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