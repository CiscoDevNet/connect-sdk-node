import {VoiceContentType} from "../voiceContentType";
import {StyleType} from "../types/styleType";
import {GenderType} from "../types/genderType";
import {TextFormatType} from "../types/textFormatType";
import {isNumeric} from "../../../helpers/validators";

export class TtsVoiceAudio {
    private _text: string = "";
    private _type : string = VoiceContentType.TTS;

    private _loop: number | undefined;
    private _style: string | undefined = StyleType.STANDARD;
    private _language: string | undefined = "EN_US";
    private _voice: string | undefined = "Aria";
    private _gender: string | undefined = GenderType.FEMALE;
    private _engine: string | undefined = "AZURE";
    private _textFormat: string | undefined = TextFormatType.TEXT;

    private styleTypeArr = [];
    private styleTypeStrList = "";
    private genderTypeArr = [];
    private genderTypeStrList = "";
    private txtFormatTypeArr = [];
    private txtFormatTypeStrList = "";

    constructor(text: string) {
        this.text = text;

        for(const [key, value] of Object.entries(StyleType)) {
            // @ts-ignore
            this.styleTypeArr.push(value);
        }

        for(let i = 0; i < this.styleTypeArr.length; i++) {
            this.styleTypeStrList += this.styleTypeArr[i];

            if(i < this.styleTypeArr.length) {
                this.styleTypeStrList += ", ";
            }
        }

        for(const [key, value] of Object.entries(GenderType)) {
            // @ts-ignore
            this.genderTypeArr.push(value);
        }

        for(let i = 0; i < this.genderTypeArr.length; i++) {
            this.genderTypeStrList += this.genderTypeArr[i];

            if(i < this.genderTypeArr.length) {
                this.genderTypeStrList += ", ";
            }
        }

        for(const [key, value] of Object.entries(TextFormatType)) {
            // @ts-ignore
            this.txtFormatTypeArr.push(value);
        }

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
        if(value) {
            // @ts-ignore
            if(!this.styleTypeArr.includes(value)) {
                throw Error(`Style type must be of type [${this.styleTypeStrList}]`);
            }

            this._type = value;
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

    get gender(): string | undefined {return this._language}
    set gender(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.genderTypeArr.includes(value)) {
                throw Error(`gender type must be of type [${this.genderTypeStrList}]`);
            }

            this._type = value;
        }
    }

    get textFormat(): string | undefined {return this._textFormat}
    set textFormat(value: string | undefined) {
        if(value) {
            // @ts-ignore
            if(!this.txtFormatTypeArr.includes(value)) {
                throw Error(`textFormat type must be of type [${this.txtFormatTypeStrList}]`);
            }

            this._type = value;
        }
    }
}