import {WhatsappContact} from "../contacts/whatsappContact";

export class WhatsAppStatusResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    contentType: string | undefined;
    content: string | undefined;
    previewUrl: boolean | undefined;
    url: string | undefined;
    mimeType: string | undefined;
    caption: string | undefined;
    fileName: string | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    name: string | undefined;
    address: string | undefined;
    contacts: Array<WhatsappContact> | undefined;
    messageId: string | undefined;
    acceptedTime: string | undefined;
    from: string | undefined;
    to: string | undefined;
    status: string | undefined;
    statusTime: string | undefined;
    error: object | undefined;
}