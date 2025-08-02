import {DomainError} from "./domain.error";

export class IngredientError extends DomainError {
    constructor(message: string, code: string) {
        super(message, code ?? 'INGREDIENT_ERROR');
    }
}

export class IngredientNotFound extends IngredientError {
    constructor(id?: string | unknown) {
        super(`Ingredient with id ${id ?? '<unknown>'} not found`, 'INGREDIENT_NOT_FOUND');
    }
}