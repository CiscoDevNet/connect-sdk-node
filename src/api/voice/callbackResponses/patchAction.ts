import {actionTypes} from "./actionTypes";
import {UrlAudio} from "../message/urlAudio";
import {TtsAudio} from "../message/ttsAudio";
import {MediaAudio} from "../message/mediaAudio";
import {isBoolean, isValidE164} from "../../../helpers/validators";

/**
 * Action class for sending a patch action back to the callback POST
 */

export class PatchAction {
    /**
     * @remark Value indicating which action to invoke
     */
    private _action: string = actionTypes.PATCH;

    /**
     * @remark Record call audio
     */
    private _recordCall: boolean | undefined = false;
    /**
     * @remark This audio object is played to the existing call leg while the platform is connecting the new call leg.
     */
    private _holdAudio: UrlAudio | TtsAudio | MediaAudio | undefined;
    /**
     * @remark This audio object is played to the new call leg before patching them to the existing call leg.
     */
    private _greetingAudio: UrlAudio | TtsAudio | MediaAudio | undefined;
    /**
     * @remark Use this as the calling party number when dialing the new call leg.
     */
    private _patchCallerId: string | undefined;
    /**
     * @remark Dial this number to patch on to the existing call.
     */
    private _dialedNumber: string | undefined;
    /**
     * @remark If present, called party must press this digit to be patched to the existing call, otherwise they
     * will be patched once the greeting audio has completed playing.
     */
    private _patchDigit: string | undefined;
    /**
     * @remark If enabled, DTMF signalling will be passed between the two patched call legs
     */
    private _passDtmf: boolean | undefined = true;

    constructor(dialedNumber: string | undefined) {
        this.dialedNumber = dialedNumber;
    }

    get action():string {return this._action}

    get recordCall():boolean | undefined {return this._recordCall}
    set recordCall(value: boolean | undefined) {
        if(value && !isBoolean(value)) {
            throw Error("Value for 'recordCall' must be a boolean");
        }

        this._recordCall = value;
    }

    get holdAudio(): UrlAudio | TtsAudio | MediaAudio | undefined {
        return this._holdAudio;
    }
    set holdAudio(value: UrlAudio | TtsAudio | MediaAudio | undefined) {
        this._holdAudio = value;
    }

    get greetingAudio(): UrlAudio | TtsAudio | MediaAudio | undefined {
        return this._greetingAudio;
    }
    set greetingAudio(value: UrlAudio | TtsAudio | MediaAudio | undefined) {
        this._greetingAudio = value;
    }

    get patchCallerId(): string | undefined {return this._patchCallerId}
    set patchCallerId(value: string | undefined) {
        if(value && !isValidE164(value)) {
            throw Error("value for 'patchCallerId' must be a valid E.164 string");
        }

        this._patchCallerId = value
    }

    get dialedNumber(): string | undefined {return this._dialedNumber}
    set dialedNumber(value: string | undefined) {
        if(!value || !isValidE164(value)) {
            throw Error("value for 'dialedNumber' must be defined and a valid E.164 string");
        }

        this._dialedNumber = value;
    }

    get patchDigit(): string | undefined {return this._patchDigit}
    set patchDigit(value: string | undefined) {
        this._patchDigit = value;
    }

    get passDtmf(): boolean | undefined {return this._passDtmf}
    set passDtmf(value: boolean | undefined) {
        if(value && !isBoolean(value)) {
            throw Error("value for 'passDtmf' must be boolean");
        }

        this._passDtmf = value;
    }

    toJSON() {
        const payload = {
            action: this.action,
            recordCall: this.recordCall,
            holdAudio: this.holdAudio,
            greetingAudio: this.greetingAudio,
            patchCallerId: this.patchCallerId,
            dialedNumber: this.dialedNumber,
            patchDigit: this.patchDigit,
            passDtmf: this.passDtmf
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