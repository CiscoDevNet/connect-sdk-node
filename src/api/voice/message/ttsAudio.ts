import {VoiceContentType} from "../types/voiceContentType";
import {StyleType} from "../types/styleType";
import {GenderType} from "../types/genderType";
import {TextFormatType} from "../types/textFormatType";
import {isNumeric} from "../../../helpers/validators";

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
     * @remark Repeat the audio this many times,this parameter is used in patch greetingAudio.
     */
    private _loop: number | undefined;
    /**
     * @remark Whether to use standard or neural speech
     */
    private _style: string | undefined = StyleType.STANDARD;
    /**
     * @remark Language of the text being synthesized
     */
    private _language: string | undefined = "EN_US";
    /**
     * @remark The desired voice for the rendered speech
     */
    private _voice: string | undefined = "Aria";
    /**
     * @remark Gender of the synthesized voice
     */
    private _gender: string | undefined = GenderType.FEMALE;
    /**
     * @remark Which TTS engine to use to render the speech
     */
    private _engine: string | undefined = "AZURE";
    /**
     * @remark Format of text feild. If TEXT, text field contains plain text. If SSML, text field
     * contains valid SSML script.
     */
    private _textFormat: string | undefined = TextFormatType.TEXT;

    private styleTypeArr = [];
    private styleTypeStrList = "";
    private genderTypeArr = [];
    private genderTypeStrList = "";
    private txtFormatTypeArr = [];
    private txtFormatTypeStrList = "";

    constructor(text: string) {
        this.text = text;

        /* istanbul ignore next */
        for(const [key, value] of Object.entries(StyleType)) {
            // @ts-ignore
            this.styleTypeArr.push(value);
        }

        /* istanbul ignore next */
        for(let i = 0; i < this.styleTypeArr.length; i++) {
            this.styleTypeStrList += this.styleTypeArr[i];

            if(i < this.styleTypeArr.length) {
                this.styleTypeStrList += ", ";
            }
        }

        /* istanbul ignore next */
        for(const [key, value] of Object.entries(GenderType)) {
            // @ts-ignore
            this.genderTypeArr.push(value);
        }

        /* istanbul ignore next */
        for(let i = 0; i < this.genderTypeArr.length; i++) {
            this.genderTypeStrList += this.genderTypeArr[i];

            if(i < this.genderTypeArr.length) {
                this.genderTypeStrList += ", ";
            }
        }

        /* istanbul ignore next */
        for(const [key, value] of Object.entries(TextFormatType)) {
            // @ts-ignore
            this.txtFormatTypeArr.push(value);
        }

        /* istanbul ignore next */
        for(let i = 0; i < this.txtFormatTypeArr.length; i++) {
            this.txtFormatTypeStrList += this.txtFormatTypeArr[i];

            if(i < this.txtFormatTypeArr.length) {
                this.txtFormatTypeStrList += ", ";
            }
        }
    }

    get text(): string {return this._text}
    set text(value: string) {
        if(!value || value === "") {
            throw Error("Text value must be provided for an audio object");
        }

        this._text = value;
    }

    get type(): string {return this._type}

    get loop(): number | undefined {return this._loop}
    set loop(value: number | undefined) {
        if(value && !isNumeric(value)) {
            throw Error("Loop value provided is not an integer");
        }

        this._loop = value;
    }

    get style(): string | undefined {return this._style}
    set style(value: string | undefined) {
        /* istanbul ignore next */
        if(value) {
            // @ts-ignore
            if(!this.styleTypeArr.includes(value)) {
                throw Error(`Style type must be of type [${this.styleTypeStrList}]`);
            }

            this._style = value;
        }
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
        /* istanbul ignore next */
        if(value) {
            // @ts-ignore
            if(!this.genderTypeArr.includes(value)) {
                throw Error(`gender type must be of type [${this.genderTypeStrList}]`);
            }

            this._gender = value;
        }
    }

    get engine(): string | undefined {return this._engine}
    set engine(value: string | undefined) {
        this._engine = value;
    }

    get textFormat(): string | undefined {return this._textFormat}
    set textFormat(value: string | undefined) {
        /* istanbul ignore next */
        if(value) {
            // @ts-ignore
            if(!this.txtFormatTypeArr.includes(value)) {
                throw Error(`textFormat type must be of type [${this.txtFormatTypeStrList}]`);
            }

            this._textFormat = value;
        }
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
            loop: this.loop,
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