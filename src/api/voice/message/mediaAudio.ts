import {VoiceContentType} from "../types/voiceContentType";
import {isFloat, isNumeric} from "../../../helpers/validators";

/**
 * MediaAudio object for sending with voice message call to API
 */

export class MediaAudio {
    /**
     * @remark Type of voice object being sent to API (MEDIA)
     */
    private _type : string = VoiceContentType.MEDIA;
    /**
     * @remark Media ID of the audio file you wish to play
     */
    private _mediaId: string | undefined;

    constructor(mediaId: string) {
        this.mediaId = mediaId;
    }

    get type(): string {return this._type}

    get mediaId(): string | undefined {return this._mediaId}
    set mediaId(value: string | undefined) {
        if(!value || value === "") {
            throw Error("MediaId value must be provided for an media object");
        }

        this._mediaId = value;
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            type: this.type,
            mediaId: this.mediaId
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