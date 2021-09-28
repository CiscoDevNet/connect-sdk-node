import {VoiceSessionResponse} from "./voiceSessionResponse";

export class VoiceMessageResponse {
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
}
