import {IngredientId} from "../../../../domain/value-objects/ingredient-id.vo";
import {IngredientUnit} from "../../../../domain/value-objects/ingredient-unit.vo";
import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";

export class IngredientEntity {
    id: IngredientId['value'];
    name: string;
    quantity: IngredientUnit['value'];
    unit: IngredientUnit['unit']['value']
    recipeId: RecipeId['value'];

    constructor(id: IngredientId["value"], name: string, quantity: IngredientUnit["value"], unit: IngredientUnit["unit"]['value'], recipeId: RecipeId["value"]) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.recipeId = recipeId;
    }
}