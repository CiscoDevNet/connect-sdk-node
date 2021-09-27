export class SmsStatusResponse {
    statusCode: number | undefined;
    requestId: string | undefined;
    messageId: string | undefined;
    acceptedTime: string | undefined;
    from: string | undefined;
    to: string | undefined;
    correlationId: string | undefined;
    content: string | undefined;
    contentType: string | undefined;
    dltTemplateId: string | undefined;
    status: string | undefined;
    statusTime: string | undefined;
    error: object | undefined;
}