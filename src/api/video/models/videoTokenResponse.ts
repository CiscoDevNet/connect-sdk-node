export class VideoTokenResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Newly generated session token
     */
    token: string | undefined;
    /**
     * @remark ISO8601 formatted timestamp indicating when this token expires
     */
    expiresAt: string | undefined;
}