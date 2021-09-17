import {MediaAudio, VoiceContentType} from "../../src";
import {expect} from "chai";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("MediaAudio", () => {

    it("sets constructor values properly", () => {
        const mediaAudio = new MediaAudio('id1234');

        expect(mediaAudio.mediaId).to.equal('id1234');
    });

    it("detects invalid property values", () => {
        const mediaAudio = new MediaAudio('id1234');

        expect(() => {
            // @ts-ignore
            mediaAudio.mediaId = undefined;
        }).to.throw();

        expect(() => {
            // @ts-ignore
            mediaAudio.loop = "abc";
        }).to.throw();

        expect(() => {
            mediaAudio.loop = 3;
        }).to.not.throw();
    });

    it('sets values properly', () => {
        const mediaAudio = new MediaAudio('id1234');
        mediaAudio.loop = 3;

        expect(mediaAudio.type).to.equal(VoiceContentType.MEDIA);
        expect(mediaAudio.mediaId).to.equal('id1234');
        expect(mediaAudio.loop).to.equal(3);
    });

    it("toJSON returns properties correctly", () => {
        const mediaAudio = new MediaAudio('id1234');

        expect(mediaAudio.toJSON()).to.deep.equal({
            "mediaId": "id1234",
            "type": "MEDIA"
        });
    });

});