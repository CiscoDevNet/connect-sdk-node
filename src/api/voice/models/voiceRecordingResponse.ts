export class VoiceRecordingResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark string identifying the id of the recorded session
     */
    sessionId: string | undefined;
    /**
     * @remark Array of RecordingResponse objects for each recording
     */
    recordings: Array<RecordingResponse> | undefined;
}

export class RecordingResponse {
    /**
     * @remark Length of the recording in seconds
     */
    durationSeconds: number | undefined;
    /**
     * @remark url of the specified recording
     */
    url: string | undefined;
}