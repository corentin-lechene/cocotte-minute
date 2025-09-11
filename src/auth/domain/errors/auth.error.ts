import {DomainError} from "./domain.error";

export class AuthError extends DomainError {
    constructor(message: string, code: string) {
        super(message, code ?? 'AUTH_ERROR');
    }
}

export class AuthCodeExpiredError extends AuthError {
    constructor() {
        super('Authentication code has expired', 'AUTH_CODE_EXPIRED');
    }
}