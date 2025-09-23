import {DomainError} from "../domain/errors/domain.error";

export class UseCaseError extends Error {
    public readonly code: string
    public readonly originalError?: Error

    constructor(message: string, code: string, originalError?: Error) {
        super(message)
        this.name = 'UseCaseError'
        this.code = code.toUpperCase()
        this.originalError = originalError
    }

    static fromError(error: DomainError | Error | unknown): UseCaseError {
        if(error instanceof DomainError) {
            return new UseCaseError(error.message, error.code, error);
        } else if(error instanceof Error) {
            return new UseCaseUnknownError(error)
        } else {
            return new UseCaseUnknownError();
        }
    }
}

export class UseCaseUnknownError extends UseCaseError {
    constructor(originalError?: Error) {
        super('An unknown error occurred', 'UNKNOWN', originalError);
    }
}