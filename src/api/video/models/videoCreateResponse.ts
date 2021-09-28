export class VideoCreateResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark URL of newly created Session object
     */
    location: string | undefined;
    /**
     * @remark Unique ID of the newly created session
     */
    sessionId: string | undefined;
}