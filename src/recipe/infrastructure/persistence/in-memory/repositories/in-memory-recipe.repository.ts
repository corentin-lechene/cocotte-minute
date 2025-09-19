import {RecipeWriteRepository} from "../../../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../../../domain/repository/recipe-read.repository";
import {RecipeEntity} from "../entities/recipe.entity";
import {Injectable} from "@nestjs/common";
import {Recipe} from "../../../../domain/models/recipe.model";
import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {RecipeMapper} from "../mappers/recipe.mapper";
import {RecipeNotFoundError} from "../../../../domain/errors/recipe.error";
import {IngredientNotFound} from "../../../../domain/errors/ingredient.error";
import {IngredientMapper} from "../mappers/ingredient.mapper";
import {Ingredient} from "../../../../domain/models/ingredient.model";
import {IngredientId} from "../../../../domain/value-objects/ingredient-id.vo";
import {Step} from "../../../../domain/models/step.model";
import {StepMapper} from "../mappers/step.mapper";
import {StepEntity} from "../entities/step.entity";
import {CreatorEntity} from "../entities/creator.entity";
import {CreatorMapper} from "../mappers/creator.mapper";
import {Creator} from "../../../../domain/models/creator.model";
import {StepId} from "../../../../domain/value-objects/step-id.vo";

@Injectable()
export class InMemoryRecipeRepository implements RecipeWriteRepository, RecipeReadRepository {

    private readonly recipes: RecipeEntity[] = [
        new RecipeEntity('1', 'Recette 1', "https://picsum.photos/536/354", new CreatorEntity('1', 'John', 'Doe'), false, [], []),
        new RecipeEntity('2', 'Recette 2', "https://picsum.photos/536/354", new CreatorEntity('2', 'Jane', 'Smith'), false, [], []),
        new RecipeEntity(
            '3',
            'Recette de base',
            "https://picsum.photos/536/354",
            new CreatorEntity('3', 'Alice', 'Brown'),
            true,
            [],
            [
                new StepEntity('1', 1, 'basic', 'Préparer les ingrédients'),
                new StepEntity('2', 2, 'basic', 'Mélanger les ingrédients'),
                new StepEntity('3', 3, 'basic', 'Cuire à feu moyen'),
                new StepEntity('4', 4, 'basic', 'Laisser refroidir'),
                new StepEntity('5', 5, 'basic', 'Servir chaud'),
            ]
        ),
    ];

    findAll(creator: Creator): Promise<Recipe[]> {
        return new Promise((resolve) => {
            const recipes = this.recipes
                .filter(recipeEntity => recipeEntity.creator.id === creator.id.getValue())
                .map(recipeEntity => RecipeMapper.toDomain(recipeEntity));
            resolve(recipes);
        });
    }

    findAllByBase(creator: Creator): Promise<Recipe[]> {
        return new Promise((resolve) => {
            const recipes = this.recipes
                .filter(recipeEntity => recipeEntity.creator.id === creator.id.getValue())
                .filter(recipeEntity => recipeEntity.isBase)
                .map(recipeEntity => RecipeMapper.toDomain(recipeEntity));
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

    findIngredientsByRecipeId(recipeId: RecipeId): Promise<Ingredient[]> {
        return new Promise((resolve, reject) => {
            const recipeEntity = this.recipes.find(recipe => recipe.id === recipeId.getValue());
            if (recipeEntity) {
                resolve(recipeEntity.ingredients.map((ingredient) => IngredientMapper.toDomain(ingredient)));
            } else {
                reject(new RecipeNotFoundError(recipeId.getValue()));
            }
        });
    }

    findStepsByRecipeId(recipeId: RecipeId): Promise<Step[]> {
        return new Promise((resolve, reject) => {
            const recipeEntity = this.recipes.find(recipe => recipe.id === recipeId.getValue());
            if (recipeEntity) {
                const allRecipeIds = recipeEntity.steps.map((step) => {
                    if(step.type === 'composite' && step.subRecipe) {
                        return step.subRecipe.id;
                    }
                    return null;
                }).filter((step) => step !== null).flat();

                const allRecipes = this.recipes.filter(recipe => allRecipeIds.includes(recipe.id));
                recipeEntity.steps.forEach((step) => {
                    if(step.type === 'composite' && step.subRecipe) {
                        const subRecipe = allRecipes.find(recipe => recipe.id === step.subRecipe?.id);
                        if(subRecipe) {
                            step.subRecipe = subRecipe;
                        }
                    }
                })

                resolve(recipeEntity.steps.map((step) => StepMapper.toDomain(step)));
            } else {
                reject(new RecipeNotFoundError(recipeId.getValue()));
            }
        });
    }

    create(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve) => {
            const persistenceModel = RecipeMapper.toPersistence(recipe);

            const recipeEntity = new RecipeEntity(
                persistenceModel.id,
                persistenceModel.name,
                persistenceModel.picture,
                CreatorMapper.toPersistence(recipe.creator),
                persistenceModel.isBase,
                [],
                []
            );
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

    deleteIngredientById(ingredientId: IngredientId): Promise<void> {
        return new Promise((resolve, reject) => {
            const recipeWithIngredient = this.recipes.find(recipe =>
                recipe.ingredients.some(ingredient => ingredient.id === ingredientId.getValue())
            );

            if (!recipeWithIngredient) {
                reject(new IngredientNotFound(ingredientId.getValue()));
                return;
            }

            recipeWithIngredient.ingredients = recipeWithIngredient.ingredients.filter(
                ingredient => ingredient.id !== ingredientId.getValue()
            );

            resolve();
        });
    }

    deleteStepById(stepId: StepId): Promise<void> {
        return new Promise((resolve, reject) => {
            const recipeWithStep = this.recipes.find(recipe =>
                recipe.steps.some(step => step.id === stepId.getValue())
            );

            if (!recipeWithStep) {
                reject(new IngredientNotFound(stepId.getValue()));
                return;
            }

            recipeWithStep.steps = recipeWithStep.steps.filter(
                step => step.id !== stepId.getValue()
            );

            resolve();
        });
    }
}