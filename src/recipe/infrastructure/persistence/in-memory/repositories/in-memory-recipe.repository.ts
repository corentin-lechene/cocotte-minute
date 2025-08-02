import {RecipeWriteRepository} from "../../../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../../../domain/repository/recipe-read.repository";
import {RecipeEntity} from "../entities/recipe.entity";
import {Injectable} from "@nestjs/common";
import {Recipe} from "../../../../domain/models/recipe.model";
import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {RecipeMapper} from "../mappers/recipe.mapper";
import {RecipeNotFoundError} from "../../../../domain/errors/recipe.error";

@Injectable()
export class InMemoryRecipeRepository implements RecipeWriteRepository, RecipeReadRepository {

    private readonly recipes: RecipeEntity[] = [
        new RecipeEntity('1', 'Recette 1', "https://image.fr/1", []),
        new RecipeEntity('2', 'Recette 2', "https://image.fr/2", []),
    ];

    findAll(): Promise<Recipe[]> {
        return new Promise((resolve) => {
            const recipes = this.recipes.map(recipeEntity => {
                return new Recipe(RecipeId.from(recipeEntity.id), recipeEntity.name, recipeEntity.picture);
            });
            resolve(recipes);
        });
    }

    findById(recipeId: RecipeId): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            const recipeEntity = this.recipes.find(recipe => recipe.id === recipeId.getValue());
            if (recipeEntity) {
                resolve(RecipeMapper.toDomain(recipeEntity));
            } else {
                reject(new RecipeNotFoundError(recipeId.getValue()));
            }
        });
    }

    create(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve) => {
            const persistenceModel = RecipeMapper.toPersistence(recipe);

            const recipeEntity = new RecipeEntity(persistenceModel.id, persistenceModel.name, persistenceModel.picture, []);
            this.recipes.push(recipeEntity);
            resolve(RecipeMapper.toDomain(recipeEntity));
        });
    }

    save(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            const recipeIndex = this.recipes.findIndex(r => r.id === recipe.id.getValue());
            if (recipeIndex === -1) {
                reject(new RecipeNotFoundError(recipe.id.getValue()));
                return;
            }

            const recipeEntity = RecipeMapper.toPersistence(recipe);
            this.recipes[recipeIndex] = recipeEntity;
            resolve(RecipeMapper.toDomain(recipeEntity));
        });
    }

    archive(recipeId: RecipeId): Promise<Recipe[]> {
        return new Promise((resolve) => {
            const recipeIndex = this.recipes.findIndex(recipe => recipe.id === recipeId.getValue());
            if (recipeIndex !== -1) {
                this.recipes.splice(recipeIndex, 1);
            }
            resolve(this.recipes.map(recipeEntity => RecipeMapper.toDomain(recipeEntity)));
        });
    }
}