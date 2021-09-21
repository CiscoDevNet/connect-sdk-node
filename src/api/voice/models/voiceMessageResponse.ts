import {VoiceSessionResponse} from "./voiceSessionResponse";

export class VoiceMessageResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    sessions: Array<VoiceSessionResponse> | undefined;
}
