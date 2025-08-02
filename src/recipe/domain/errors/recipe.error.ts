import {DomainError} from "./domain.error";

export class RecipeError extends DomainError {
    constructor(message: string, code: string) {
        super(message, `RECIPE_${code}`)
    }
}

export class RecipeNotFoundError extends RecipeError {
    constructor(id?: string | unknown) {
        super(`Recipe with id ${id ?? '<unknown>'} not found`, 'NOT_FOUND');
    }
}

export class RecipeIngredientNotFoundError extends RecipeError {
    constructor(id?: string | unknown) {
        super(`Recipe ingredient with id ${id ?? '<unknown>'} not found`, 'INGREDIENT_NOT_FOUND');
    }
}