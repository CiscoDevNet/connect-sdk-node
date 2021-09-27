import {WhatsappContact} from "../contacts/whatsappContact";

export class WhatsAppStatusResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Content type of the message
     */
    contentType: string | undefined;
    /**
     * @remark Content of the message
     */
    content: string | undefined;
    /**
     * @remark Provides a preview of a URL included in the text message body
     */
    previewUrl: boolean | undefined;
    /**
     * @remark URL pointing to media asset
     */
    url: string | undefined;
    /**
     * @remark The IANA media type of the content specified at the URL
     */
    mimeType: string | undefined;
    /**
     * @remark Text to be displayed by your asset on the device
     */
    caption: string | undefined;
    /**
     * @remark File name of the media asset
     */
    fileName: string | undefined;
    /**
     * @remark Latitude of the location in decimal format
     */
    latitude: number | undefined;
    /**
     * @remark Longitude of the location in decimal format
     */
    longitude: number | undefined;
    /**
     * @remark Name of location
     */
    name: string | undefined;
    /**
     * @remark Address of location. Only displayed if name is present.
     */
    address: string | undefined;
    /**
     * @remark Array of WhatsappContact objects for the message
     */
    contacts: Array<WhatsappContact> | undefined;
    /**
     * @remark Message's unique ID
     */
    messageId: string | undefined;
    /**
     * @remark Timestamp in ISO8601 format when message was received by the API
     */
    acceptedTime: string | undefined;
    /**
     * @remark WhatsApp sender ID that the message was sent from
     */
    from: string | undefined;
    /**
     * @remark Mobile device phone number in E.164 format that the message was sent to
     */
    to: string | undefined;
    /**
     * @remark Message status QUEUED/SENT/DELIVERED/READ/FAILED
     */
    status: string | undefined;
    /**
     * @remark Timestamp in ISO8601 format reflecting when the message status was updated
     */
    statusTime: string | undefined;
    /**
     * @remark This is only included if the status is FAILED
     */
    error: object | undefined;
}