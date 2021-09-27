export class VoiceStatusResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    sessionId: string | undefined;
    callerId: string | undefined;
    dialedNumber: string | undefined;
    status: string | undefined;
    correlationId: string | undefined;
    durationSeconds: number | undefined;
    offeredTime: string | undefined;
    answeredTime: string | undefined;
}