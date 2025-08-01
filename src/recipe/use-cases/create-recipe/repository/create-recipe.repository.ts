import {Recipe} from "../../../domain/models/recipe.model";

export abstract class CreateRecipeRepository {
    abstract create(recipe: Recipe): Promise<Recipe>;
}