import {HttpException} from "@nestjs/common";

export interface HTTPExceptionPayload {
    statusCode: number;
    errorCode: string;
    message: string;
}

export class HTTPException extends HttpException {
    constructor(payload: HTTPExceptionPayload) {
        super({
            statusCode: payload.statusCode,
            errorCode: payload.errorCode,
            message: payload.message,
        }, payload.statusCode);
    }
}

export class HTTPUnknownException extends HTTPException {
    constructor(originalError?: Error) {
        super({
            statusCode: 500,
            errorCode: 'UNKNOWN',
            message: 'An unknown error occurred',
        });
        this.name = 'HTTPUnknownException';
        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}