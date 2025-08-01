import {Recipe} from "../../../domain/models/recipe.model";

export abstract class FindRecipesRepository {
    abstract findAll(): Promise<Recipe[]>;
}