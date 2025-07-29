import {FindRecipesRepository} from "../../../../use-cases/recipes/find-recipes/repository/find-recipes.repository";
import {RecipeEntity} from "../entities/recipe.entity";
import {Recipe} from "../../../../domain/recipe/recipe.model";
import {RecipeId} from "../../../../domain/recipe/value-objects/recipe-id.vo";
import {Injectable} from "@nestjs/common";
import {RecipeMapper} from "../mappers/recipe.mapper";

@Injectable()
export class InMemoryRecipeRepository implements FindRecipesRepository {
    private readonly recipes: RecipeEntity[] = [
        new RecipeEntity('1', 'Recette 1', "https://image.fr/1"),
        new RecipeEntity('2', 'Recette 2', "https://image.fr/2"),
    ];

    findAll(): Promise<Recipe[]> {
        return new Promise((resolve) => {
            const recipes = this.recipes.map(recipeEntity => {
                return new Recipe(RecipeId.from(recipeEntity.id), recipeEntity.name, recipeEntity.picture);
            });
            resolve(recipes);
        });
    }

    create(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve) => {
            const persistenceModel = RecipeMapper.toPersistence(recipe);

            const recipeEntity = new RecipeEntity(persistenceModel.id, persistenceModel.name, persistenceModel.picture);
            this.recipes.push(recipeEntity);
            resolve(RecipeMapper.toDomain(recipeEntity));
        });
    }
}