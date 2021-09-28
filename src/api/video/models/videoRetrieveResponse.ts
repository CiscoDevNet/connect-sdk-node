export class VideoRetrieveResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark CPaaS App ID
     */
    appId: string | undefined;
    /**
     * @remark Descriptive name for your video session
     */
    name: string | undefined;
    /**
     * @remark Unique ID of session being queried
     */
    sessionId: string | undefined;
}