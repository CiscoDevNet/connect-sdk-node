import {UrlAudio, VoiceContentType} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("UrlAudio", () => {

    it("sets constructor values properly", () => {
        const urlAudio = new UrlAudio('http://www.mysite.com/audio.mp3');

        expect(urlAudio.location).to.equal('http://www.mysite.com/audio.mp3');
    });

    it("detects invalid property values", () => {
        const urlAudio = new UrlAudio('http://www.mysite.com/audio.mp3');

        expect(() => {
            // @ts-ignore
            urlAudio.location = undefined;
        }).to.throw();
    });

    it('sets values properly', () => {
        const urlAudio = new UrlAudio('http://www.mysite.com/audio.mp3');

        expect(urlAudio.type).to.equal(VoiceContentType.URL);
        expect(urlAudio.location).to.equal('http://www.mysite.com/audio.mp3');
    });

    it("toJSON returns properties correctly", () => {
        const urlAudio = new UrlAudio('http://www.mysite.com/audio.mp3');

        expect(urlAudio.toJSON()).to.deep.equal({
            "location": "http://www.mysite.com/audio.mp3",
            "type": "URL"
        });
    });

});