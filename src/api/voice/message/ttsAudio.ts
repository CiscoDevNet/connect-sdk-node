import {VoiceContentType} from "../types/voiceContentType";
import {StyleType} from "../types/styleType";
import {GenderType} from "../types/genderType";
import {TextFormatType} from "../types/textFormatType";
import {typeToArr, concatTypes} from "../../../helpers/tools";

/**
 * TtsAudio object for sending with voice message call to API
 */

export class TtsAudio {
    /**
     * @remark The text that you wish to be rendered to speech via the TTS engine. This can be plain text or SSML.
     */
    private _text: string = "";
    /**
     * @remark Type of voice object being sent to API (TTS)
     */
    private _type : string = VoiceContentType.TTS;

    /**
     * @remark Whether to use standard or neural speech
     * @default STANDARD
     */
    private _style: string | undefined = StyleType.STANDARD;
    /**
     * @remark Language of the text being synthesized
     * @default EN_US
     */
    private _language: string | undefined = "en-US";
    /**
     * @remark The desired voice for the rendered speech
     * @default AriaUS
     */
    private _voice: string | undefined = "AriaRUS";
    /**
     * @remark Gender of the synthesized voice
     * @default FEMALE
     */
    private _gender: string | undefined = GenderType.FEMALE;
    /**
     * @remark Which TTS engine to use to render the speech
     * @default AZURE
     */
    private _engine: string | undefined = "AZURE";
    /**
     * @remark Format of text feild. If TEXT, text field contains plain text. If SSML, text field
     * contains valid SSML script.
     * @default TEXT
     */
    private _textFormat: string | undefined = TextFormatType.TEXT;

    private styleTypeArr: Array<string> = typeToArr(StyleType);
    private styleTypeStrList = concatTypes(this.styleTypeArr);
    private genderTypeArr: Array<string> = typeToArr(GenderType);
    private genderTypeStrList = concatTypes(this.genderTypeArr);
    private txtFormatTypeArr: Array<string> = typeToArr(TextFormatType);
    private txtFormatTypeStrList = concatTypes(this.txtFormatTypeArr);

    constructor(text: string) {
        this.text = text;
    }

    get text(): string {return this._text}
    set text(value: string) {
        if(!value || value === "") {
            throw Error("Text value must be provided for an audio object");
        }

        this._text = value;
    }

    get type(): string {return this._type}

    get style(): string | undefined {return this._style}
    set style(value: string | undefined) {
        // @ts-ignore
        if(!this.styleTypeArr.includes(value)) {
            throw Error(`Style type must be of type [${this.styleTypeStrList}]`);
        }

        this._style = value;
    }

    get language(): string | undefined {return this._language}
    set language(value: string | undefined) {
        this._language = value;
    }

    get voice(): string | undefined {return this._voice}
    set voice(value: string | undefined) {
        this._voice = value;
    }

    get gender(): string | undefined {return this._gender}
    set gender(value: string | undefined) {
        // @ts-ignore
        if(!this.genderTypeArr.includes(value)) {
            throw Error(`gender type must be of type [${this.genderTypeStrList}]`);
        }

        this._gender = value;
    }

    get engine(): string | undefined {return this._engine}
    set engine(value: string | undefined) {
        this._engine = value;
    }

    get textFormat(): string | undefined {return this._textFormat}
    set textFormat(value: string | undefined) {
        // @ts-ignore
        if(!this.txtFormatTypeArr.includes(value)) {
            throw Error(`textFormat type must be of type [${this.txtFormatTypeStrList}]`);
        }

        this._textFormat = value;
    }

    /**
     * Returns object of fields for the API, stripping any undefined values
     *
     * @returns object fields packaged for sending to the API
     */

    toJSON() {
        const payload = {
            text: this.text,
            type: this.type,
            style: this.style,
            language: this.language,
            voice: this.voice,
            gender: this.gender,
            engine: this.engine,
            textFormat: this.textFormat
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