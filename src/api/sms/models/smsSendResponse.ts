export class SmsSendResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Timestamp in ISO8601 format when message was received by the API
     */
    acceptedTime: string | undefined;
    /**
     * @remark Unique ID identifying this message
     */
    messageId: string | undefined;
    /**
     * @remark User defined ID that is assigned to an individual message
     */
    correlationId: string | undefined
}