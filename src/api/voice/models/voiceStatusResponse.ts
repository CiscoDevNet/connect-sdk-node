export class VoiceStatusResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Unique ID that identifies the session
     */
    sessionId: string | undefined;
    /**
     * @remark The calling party number used when placing the call to the dialed number
     */
    callerId: string | undefined;
    /**
     * @remark The number that the call was placed to
     */
    dialedNumber: string | undefined;
    /**
     * @remark status of the session COMPLETED/QUEUED/FAILED
     */
    status: string | undefined;
    /**
     * @remark User provided correlation ID that was provided with the initial API request
     */
    correlationId: string | undefined;
    /**
     * @remark How long the call was connected for
     */
    durationSeconds: number | undefined;
    /**
     * @remark Time when the call was initiatied
     */
    offeredTime: string | undefined;
    /**
     * @remark Time when the call was answered
     */
    answeredTime: string | undefined;
}