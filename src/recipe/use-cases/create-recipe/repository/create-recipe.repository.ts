import {Recipe} from "../../../domain/recipe/recipe.model";

export abstract class CreateRecipeRepository {
    abstract create(recipe: Recipe): Promise<Recipe>;
}