import {TtsAudio, VoiceContentType, StyleType, GenderType, TextFormatType} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("TtsAudio", () => {

    it("sets constructor values properly", () => {
        const ttsAudio = new TtsAudio('hello world');

        expect(ttsAudio.text).to.equal('hello world');
    });

    it("detects invalid property values", () => {
        const ttsAudio = new TtsAudio('hello world');

        expect(() => {
            // @ts-ignore
            ttsAudio.text = undefined;
        }).to.throw();

        expect(() => {
            ttsAudio.style = "abc";
        }).to.throw();

        expect(() => {
            ttsAudio.style = StyleType.STANDARD
        }).to.not.throw();

        expect(() => {
            ttsAudio.gender = "abc";
        }).to.throw();

        expect(() => {
            ttsAudio.gender = GenderType.MALE;
        }).to.not.throw();

        expect(() => {
            ttsAudio.textFormat = "abc";
        }).to.throw();

        expect(() => {
            ttsAudio.textFormat = TextFormatType.TEXT;
        });
    });

    it('sets values properly', () => {
        const ttsAudio = new TtsAudio('hello world');
        ttsAudio.style = StyleType.STANDARD
        ttsAudio.language = "EN_US";
        ttsAudio.voice = "Aria";
        ttsAudio.gender = GenderType.MALE;
        ttsAudio.engine = "AZURE"
        ttsAudio.textFormat = TextFormatType.SSML;

        expect(ttsAudio.type).to.equal(VoiceContentType.TTS);
        expect(ttsAudio.style).to.equal(StyleType.STANDARD);
        expect(ttsAudio.language).to.equal("EN_US");
        expect(ttsAudio.voice).to.equal("Aria");
        expect(ttsAudio.gender).to.equal(GenderType.MALE);
        expect(ttsAudio.engine).to.equal("AZURE");
        expect(ttsAudio.textFormat).to.equal(TextFormatType.SSML);
    });

    it("toJSON returns properties correctly", () => {
        const ttsAudio = new TtsAudio('hello world');
        ttsAudio.voice = undefined;

        expect(ttsAudio.toJSON()).to.deep.equal({
            "engine": "AZURE",
            "gender": "FEMALE",
            "language": "en-US",
            "style": "STANDARD",
            "text": "hello world",
            "textFormat": "TEXT",
            "type": "TTS"
        });
    });

});