export class VoiceSessionResponse {
    /**
     * @remark Unique session ID identifying this call
     */
    sessionId: string | undefined;
    /**
     * @remark status of session QUEUED/FAILED
     */
    status: string | undefined;
    /**
     * @remark number dialed for session
     */
    dialedNumber: string | undefined;
}