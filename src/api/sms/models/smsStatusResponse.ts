export class SmsStatusResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Message's unique ID
     */
    messageId: string | undefined;
    /**
     * @remark Timestamp in ISO8601 format when message was received by the API
     */
    acceptedTime: string | undefined;
    /**
     * @remark Short or long code that the message was sent from
     */
    from: string | undefined;
    /**
     * @remark Mobile device phone number in E.164 format that the message was sent to
     */
    to: string | undefined;
    /**
     * @remark User defined ID that is assigned to an individual message
     */
    correlationId: string | undefined;
    /**
     * @remark Actual message content that was sent to the device. This contains any substitutions that
     * may have been made.
     */
    content: string | undefined;
    /**
     * @remark Denotes whether the content string is the actual text content to be sent or a reference to
     * a template ID.
     */
    contentType: string | undefined;
    /**
     * @remark Specifies the DLT template ID used for this message. This is only used in certain regions.
     */
    dltTemplateId: string | undefined;
    /**
     * @remark Message status
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