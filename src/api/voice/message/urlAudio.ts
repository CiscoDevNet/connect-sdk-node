import {VoiceContentType} from "../types/voiceContentType";
import {isFloat, isNumeric, isValidHttpUrl} from "../../../helpers/validators";

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

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        return {
            type: this.type,
            location: this.location
        }
    }
}