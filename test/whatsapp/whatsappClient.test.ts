import {WhatsappClient, WhatsappTextMessage, WhatsappContentType, ClientConfiguration} from "../../src";
import {expect} from "chai";
import nock from "nock";
import {API_SANDBOX_URL, API_VERSION} from "../../src/config/constants";
import {WhatsappContact, WhatsappContactMessage} from "../../src";

const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    stub = sinon.stub;

chai.use(chaiAsPromised);

describe("WhatsappClient", () => {
    const clientConfig = new ClientConfiguration('123', API_SANDBOX_URL);

    it("throws error if idempotencyKey is blank", () => {
        const client = new WhatsappClient(clientConfig);
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'idempotencyKey').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'idempotencyKey' value for sending a message");

        stub(message, 'idempotencyKey').restore();
    });

    it("throws error if 'to' is blank", () => {
        const client = new WhatsappClient(clientConfig);
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'to').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'to' value for sending a message");

        stub(message, 'to').restore();
    });

    it("throws error if 'from' is blank", () => {
        const client = new WhatsappClient(clientConfig);
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');

        stub(message, 'from').get(() => '');

        expect(() => {
            client.sendMessage(message)
        }).to.throw("Must provide a 'from' value for sending a message");

        stub(message, 'from').restore();
    });

    it("handles contact message validation properly", () => {
        const client = new WhatsappClient(clientConfig);
        const message = new WhatsappContactMessage('+12223334444', '+13334445555');
        const contact = new WhatsappContact();

        expect(() => {
            client.sendMessage(message);
        }).to.throw();

        message.addContact(contact);

        expect(() => {
            client.sendMessage(message);
        }).to.throw();

        const messageB = new WhatsappContactMessage('+12223334444', '+13334445555');

        contact.formattedName = "tester mctester";
        messageB.addContact(contact);

        expect(() => {
            client.sendMessage(messageB);
        }).to.throw();

        const messageC = new WhatsappContactMessage('+12223334444', '+13334445555');

        contact.firstName = "tester";
        messageC.addContact(contact);

        expect(() => {
            client.sendMessage(messageC);
        }).to.not.throw();
    })

    it("returns proper values on sendMessage", async () => {
        const client = new WhatsappClient(clientConfig);
        const message = new WhatsappTextMessage('12345', '+14443332222', 'hello world');
        message.content = "Hello World";

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(202, {
                acceptedTime: '2021-08-01T14:24:33.000Z'
            });

        let response = await client.sendMessage(message);

        // @ts-ignore
        expect(response.acceptedTime).to.equal('2021-08-01T14:24:33.000Z');

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(400, {
                code: '1234'
            });

        try {
            response = await client.sendMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('1234');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(403, {
                code: '456'
            });

        try {
            response = await client.sendMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('456');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(404);

        try {
            response = await client.sendMessage(message);
        } catch(err: any) {
            expect(err.statusCode).to.equal(404);
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(500, {
                code: '890'
            });

        try {
            response = await client.sendMessage(message);
        } catch(err: any) {
            expect(err.code).to.equal('890');
        }

        nock(`${API_SANDBOX_URL}`)
            .post(`/${API_VERSION}/whatsapp/messages`)
            .reply(600, {
                code: '890'
            });

        try {
            response = await client.sendMessage(message);
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            })
        }
    });

    it("returns proper values on getStatus", async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                messageId: '1234',
                contentType: 'TEXT'
            });

        let response = await client.getStatus('1234');

        // @ts-ignore
        expect(response.messageId).to.equal('1234');

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(404);

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err.statusCode).to.equal(404);
        }

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(500, {
                code: '445'
            });

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err.code).to.equal('445');
        }

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(600, {
                code: '890'
            });

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err).to.deep.equal({
                statusCode: 600,
                body: '{"code":"890"}',
                error: undefined,
                headers: { 'content-type': 'application/json' }
            });
        }

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .replyWithError("Test Error");

        try {
            response = await client.getStatus('1234');
        } catch(err: any) {
            expect(err.error.message).to.equal("Test Error");
        }
    });

    it('gets status of text message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.TEXT,
                content: 'hello world'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.TEXT);
        expect(response.content).to.equal('hello world');
    });

    it('gets status of audio message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.AUDIO,
                url: 'http://www.audio.com/audio.mp3'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.AUDIO);
        expect(response.url).to.equal('http://www.audio.com/audio.mp3');
    });

    it('gets status of image message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.IMAGE,
                url: 'http://www.image.com/image.jpg'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.IMAGE);
        expect(response.url).to.equal('http://www.image.com/image.jpg');
    });

    it('gets status of video message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.VIDEO,
                url: 'http://www.video.com/video.avi'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.VIDEO);
        expect(response.url).to.equal('http://www.video.com/video.avi');
    });

    it('gets status of document message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.DOCUMENT,
                url: 'http://www.myurl.com/doc.docx'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.DOCUMENT);
        expect(response.url).to.equal('http://www.myurl.com/doc.docx');
    });

    it('gets status of sticker message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.STICKER,
                url: 'http://www.myurl.com/sticker.jpg'
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.STICKER);
        expect(response.url).to.equal('http://www.myurl.com/sticker.jpg');
    });

    it('gets status of location message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.LOCATION,
                latitude: 12.12,
                error: {
                    code: 1234,
                    message: 'error message'
                }
            });

        const response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.LOCATION);
        expect(response.latitude).to.equal(12.12);
        expect(response.error).to.deep.equal({
            code: 1234,
            message: 'error message'
        })
    });

    it('gets status of contact message correctly', async () => {
        const client = new WhatsappClient(clientConfig);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.CONTACTS,
                contacts: [
                    {
                        firstName: 'Tester',
                        phones: [{number: '+13334445555'}],
                        addresses: [{city: 'fake city'}],
                        emails: [{address: 'fake@email.com'}],
                        urls: [{address: 'http://mysite.com'}]
                    }
                ]
            });

        let response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.CONTACTS);
        // @ts-ignore
        expect(response.contacts[0].firstName).to.equal('Tester');
        // @ts-ignore
        expect(response.contacts[0].phones[0].number).to.equal('+13334445555');
        // @ts-ignore
        expect(response.contacts[0].addresses[0].city).to.equal('fake city');
        // @ts-ignore
        expect(response.contacts[0].emails[0].address).to.equal('fake@email.com');
        // @ts-ignore
        expect(response.contacts[0].urls[0].address).to.equal('http://mysite.com');

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.CONTACTS
            });

        response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.CONTACTS);
        expect(response.contacts).to.deep.equal([]);

        nock(`${API_SANDBOX_URL}`)
            .get(`/${API_VERSION}/whatsapp/messages/1234`)
            .reply(200, {
                contentType: WhatsappContentType.CONTACTS,
                contacts: [
                    {
                        firstName: 'Tester',
                        company: 'Test Company',
                        birthday: '2021-08-01T14:24:33.000Z',
                        department: 'test dept',
                        formattedName: 'Tester',
                        lastName: 'Smith',
                        middleName: 'J',
                        namePrefix: 'Mr.',
                        nameSuffix: 'Sr',
                        title: "tester"
                    }
                ]
            });

        response = await client.getStatus('1234');

        expect(response.contentType).to.equal(WhatsappContentType.CONTACTS);
        expect(response.contacts).to.deep.equal([
            {
                "addresses": [],
                "birthday": "2021-08-01T14:24:33.000Z",
                "company": "Test Company",
                "department": "test dept",
                "emails": [],
                "firstName": "Tester",
                "formattedName": "Tester",
                "lastName": "Smith",
                "middleName": "J",
                "namePrefix": "Mr.",
                "nameSuffix": "Sr",
                "phones": [],
                "title": "tester",
                "urls": []
            }
        ]);
    });

});