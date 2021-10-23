import {WhatsappContentType, WhatsappTemplateMessage, MediaHeader, TemplateHeaderTypes, TemplateSubstitution} from "../../src";
import {expect} from "chai";
import {QuickReply} from "../../src/api/whatsapp/template/whatsappTemplateMessage";

describe("WhatsappTemplateMessage", () => {
    it("sets constructor values properly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');

        expect(message.from).to.equal('12345');
        expect(message.to).to.equal('+14443332222');
        expect(message.templateId).to.equal('tmpl1234');
        expect(message.idempotencyKey).to.not.be.null;
    });

    it("throws validation errors correctly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');

        expect(() => {
            message.to = "abc";
        }).to.throw();
        expect(() => {
            message.to = "+14443332222";
        }).to.not.throw();

        expect(message.contentType).to.equal(WhatsappContentType.TEMPLATE);

        expect(() => {
            message.callbackUrl = "http://invalidURL";
        }).to.throw();
        expect(() => {
            message.callbackUrl = "https://www.google.com";
        }).to.not.throw();
        expect(message.callbackUrl).to.equal("https://www.google.com");
    });

    it("addSubstitution adds substitutions correctly and errors correctly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');

        expect(() => {
            new TemplateSubstitution("badDate")
                .of_datetime('hello', 'dateFallback')
        }).to.throw();

        const dateSub = new TemplateSubstitution("newDate")
            .of_datetime('2011-10-05T14:48:00.000Z', 'dateFallback');

        message.addSubstitution(dateSub);

        const urlSub = new TemplateSubstitution("newUrl")
            .of_url("/someAction");

        message.addSubstitution(urlSub);

        const currSub = new TemplateSubstitution("newCurr")
            .of_currency('USD', 100, 'currFallback');

        message.addSubstitution(currSub);

        const textSub = new TemplateSubstitution("newText")
            .of_text("hello world");

        message.addSubstitution(textSub);

        expect(message.substitutions).to.deep.equal({
            "newCurr": {
                "amount1000": 100,
                "code": "USD",
                "contentType": "CURRENCY",
                "fallbackValue": "currFallback"
            },
            "newDate": {
                "contentType": "DATETIME",
                "fallbackValue": "dateFallback",
                "isoString": "2011-10-05T14:48:00.000Z"
            },
            "newText": "hello world",
            "newUrl": {
                "contentType": "URL",
                "suffix": "/someAction"
            }
        });

        expect(() => {
            const currSubErr = new TemplateSubstitution("")
                .of_currency('USD', 100, 'currFallback');
        }).to.throw();
    });

    it("sets remaining values correctly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');
        message.correlationId = "corr123";
        message.callbackData = "cbdata123";

        expect(message.correlationId).to.equal("corr123");
        expect(message.callbackData).to.equal("cbdata123");
        expect(message.idempotencyKey).to.not.be.null;
    });

    it('creates quick reply object correctly', () => {
        const quickReply = new QuickReply("btnText", "pld");

        expect(quickReply.buttonText).to.equal("btnText");
        expect(quickReply.payload).to.equal("pld");
    });

    it('adds quick reply to message correctly', () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');

        expect(() => {
            message.addQuickReply("", undefined);
        }).to.throw();

        message.addQuickReply("btnText", undefined);

        expect(message.toJSON().quickReplies).to.deep.equal([
            {
                "buttonText": "btnText"
            }
        ]);

        message.addQuickReply("btnText", "pyld");

        expect(message.toJSON().quickReplies).to.deep.equal([
            {
                "buttonText": "btnText"
            },
            {
                "buttonText": "btnText",
                "payload": "pyld"
            }
        ]);

        message.addQuickReply("btnText3", "pyld");

        expect(() => {
            message.addQuickReply("btnText4", "pyld");
        }).to.throw();
    });

    it('sets mediaHeader correctly', () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');
        const mediaHeader = new MediaHeader(TemplateHeaderTypes.IMAGE, "http://www.mysite.com/image.png", "image.png");

        expect(mediaHeader.contentType).to.equal(TemplateHeaderTypes.IMAGE);
        expect(mediaHeader.url).to.equal('http://www.mysite.com/image.png');
        expect(mediaHeader.filename).to.equal('image.png');

        message.mediaHeader = mediaHeader;

        expect(() => {
            new MediaHeader(TemplateHeaderTypes.IMAGE, "abc", "blah.png");
        }).to.throw();

        expect(mediaHeader.toJSON()).to.deep.equal({
            contentType: TemplateHeaderTypes.IMAGE,
            url: 'http://www.mysite.com/image.png',
            filename: 'image.png'
        });

        expect(message.toJSON()).to.deep.equal({
            "contentType": "TEMPLATE",
            "from": "12345",
            "mediaHeader": {
                "contentType": "IMAGE",
                "filename": "image.png",
                "url": "http://www.mysite.com/image.png"
            },
            "quickReplies": [],
            "substitutions": {},
            "templateId": "tmpl1234",
            "to": "+14443332222"
        })
    })

    it("toJSON returns properties correctly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');
        message.callbackUrl = "http://www.google.com";
        message.callbackData = "abc|123";

        expect(message.toJSON()).to.deep.equal({
            "callbackData": "abc|123",
            "callbackUrl": "http://www.google.com",
            "contentType": "TEMPLATE",
            "from": "12345",
            "quickReplies": [],
            "substitutions": {},
            "templateId": "tmpl1234",
            "to": "+14443332222"
        });
    });

});