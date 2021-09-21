import {VoiceSessionResponse} from "./voiceSessionResponse";

export class VoiceCallResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    sessions: Array<VoiceSessionResponse> | undefined;
}