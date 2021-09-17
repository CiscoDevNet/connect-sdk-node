import {VoiceContentType} from "../types/voiceContentType";
import {isNumeric, isValidHttpUrl} from "../../../helpers/validators";

/**
 * UrlAudio object for sending with voice message call to API
 */

export class UrlAudio {
    /**
     * @remark Type of voice object being sent to API (URL)
     */
    private _type : string = VoiceContentType.URL;

    /**
     * @remark URL to the audio file you wish to play
     */
    private _location: string | undefined;

    /**
     * @remark Repeat the audio this many times,this parameter is used in patch greetingAudio.
     */
    private _loop: number | undefined;

    constructor(location: string) {
        this.location = location;
    }

    get type(): string {return this._type}

    get location(): string | undefined {return this._location}
    set location(value: string | undefined) {
        if(!value || !isValidHttpUrl(value)) {
            throw Error("location value must be provided for an media object");
        }

        this._location = value;
    }

    get loop(): number | undefined {return this._loop}
    set loop(value: number | undefined) {
        if(value && !isNumeric(value)) {
            throw Error("Loop value provided is not an integer");
        }

        this._loop = value;
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            type: this.type,
            loop: this.loop,
            location: this.location
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