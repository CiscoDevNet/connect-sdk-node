import {VoiceSessionResponse} from "./voiceSessionResponse";

export class VoiceCallResponse {
    /**
     * @remark Status code of the response
     */
    statusCode: number | undefined;
    /**
     * @remark Unique ID that identifies this HTTP request.
     */
    requestId: string | undefined;
    /**
     * @remark Array of VoiceSessionResponse objects for each session
     */
    sessions: Array<VoiceSessionResponse> | undefined;
    /**
     * @remark Unique session ID identifying this call
     */
    sessionId: string | undefined;
    /**
     * @remark status of session QUEUED/FAILED
     */
    status: string | undefined;
}