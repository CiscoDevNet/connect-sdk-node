import {WhatsappTemplateMessage, WhatsappContentType} from "../../src";
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
            message.addSubstitution("", "test")
        }).to.throw();

        expect(() => {
            message.addSubstitution("name", "tester")
        }).to.not.throw();

        expect(message.substitutions).to.deep.equal([{"name": "tester"}]);
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
        expect(quickReply.type).to.equal("contact");
    });

    it('adds quick reply to message correctly', () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');

        expect(() => {
            message.addQuickReply("", undefined);
        }).to.throw();

        message.addQuickReply("btnText", undefined);

        expect(message.toJSON().quickReply).to.deep.equal({
            contact: {buttonText: 'btnText'}
        });

        message.addQuickReply("btnText", "pyld");

        expect(message.toJSON().quickReply).to.deep.equal({
            contact: {
                buttonText: 'btnText',
                payload: 'pyld'
            }
        });
    });

    it("toJSON returns properties correctly", () => {
        const message = new WhatsappTemplateMessage('12345', '+14443332222', 'tmpl1234');
        message.callbackUrl = "http://www.google.com";
        message.callbackData = "abc|123";
        message.addSubstitution("key1", "value1");

        expect(message.toJSON()).to.deep.equal({
            "callbackData": "abc|123",
            "callbackUrl": "http://www.google.com",
            "contentType": "TEMPLATE",
            "from": "12345",
            "substitutions": [
                {
                    "key1": "value1"
                }
            ],
            "templateId": "tmpl1234",
            "to": "+14443332222"
        });
    });

});