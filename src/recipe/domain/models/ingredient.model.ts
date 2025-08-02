import {IngredientUnit} from "../value-objects/ingredient-unit.vo";
import {IngredientId} from "../value-objects/ingredient-id.vo";

export class Ingredient {
    id: IngredientId;
    name: string;
    unit: IngredientUnit;

    constructor(id: IngredientId, name: string, unit: IngredientUnit) {
        this.id = id;
        this.name = name;
        this.unit = unit;
    }
}