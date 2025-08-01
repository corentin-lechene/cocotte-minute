import {Recipe} from "../../../domain/recipe/recipe.model";

export abstract class FindRecipesRepository {
    abstract findAll(): Promise<Recipe[]>;
}