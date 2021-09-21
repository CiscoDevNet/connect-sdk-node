export class VoiceRecordingResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    sessionId: string | undefined;
    recordings: Array<RecordingResponse> | undefined;
}

export class RecordingResponse {
    durationSeconds: number | undefined;
    url: string | undefined;
}