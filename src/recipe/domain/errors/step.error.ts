import {DomainError} from "./domain.error";

export class StepError extends DomainError {
    constructor(message: string, code: string) {
        super(message, code)
    }
}

export class StepNotFoundError extends StepError {
    constructor(id?: string | unknown) {
        super(`Step with id ${id ?? '<unknown>'} not found`, 'NOT_FOUND');
    }
}