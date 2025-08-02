import {RecipeId} from "../value-objects/recipe-id.vo";
import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {IngredientUnit} from "../value-objects/ingredient-unit.vo";
import {IngredientId} from "../value-objects/ingredient-id.vo";

export class RecipeFactory {
    create(name: string, picture: string): Recipe {
        const id = RecipeId.generate();
        return new Recipe(id, name, picture);
    }

    createIngredient(name: string, unit: IngredientUnit): Ingredient {
        const id = IngredientId.generate();
        return new Ingredient(id, name, unit);
    }
}