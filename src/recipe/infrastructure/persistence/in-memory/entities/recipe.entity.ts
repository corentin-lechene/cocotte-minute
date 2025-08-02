import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {IngredientEntity} from "./ingredient.entity";

export class RecipeEntity {
    id: RecipeId['value'];
    name: string;
    picture: string;
    ingredients: IngredientEntity[]

    constructor(id: RecipeId['value'], name: string, picture: string, ingredients: IngredientEntity[]) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.ingredients = ingredients;
    }
}