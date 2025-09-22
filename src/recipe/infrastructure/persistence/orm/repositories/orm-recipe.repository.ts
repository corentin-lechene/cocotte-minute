import {Injectable} from "@nestjs/common";
import {RecipeWriteRepository} from "../../../../domain/repository/recipe-write.repository";
import {RecipeReadRepository} from "../../../../domain/repository/recipe-read.repository";
import {Recipe} from "src/recipe/domain/models/recipe.model";
import {IngredientId} from "src/recipe/domain/value-objects/ingredient-id.vo";
import {RecipeId} from "src/recipe/domain/value-objects/recipe-id.vo";
import {StepId} from "src/recipe/domain/value-objects/step-id.vo";
import {Creator} from "src/recipe/domain/models/creator.model";
import {Ingredient} from "src/recipe/domain/models/ingredient.model";
import {Step} from "src/recipe/domain/models/step.model";
import {RecipeEntity} from "../entities/recipe.entity";
import {RecipeMapper} from "../mappers/recipe.mapper";
import {IngredientMapper} from "../mappers/ingredient.mapper";
import {StepEntity} from "../entities/step.entity";
import {StepMapper} from "../mappers/step.mapper";
import {CreatorEntity} from "../entities/creator.entity";
import {Knex} from "knex";

@Injectable()
export class OrmRecipeRepository implements RecipeWriteRepository, RecipeReadRepository {
    private db: Knex = require('knex')

    constructor() {
        this.db = require('knex')({
            client: 'pg',
            connection: {
                host: process.env['DB_HOST'],
                port: process.env['DB_PORT'],
                user: process.env['DB_USER'],
                database: process.env['DB_NAME'],
                password: process.env['DB_PASSWORD'],
                ssl: process.env['DB_SSL'] ? {rejectUnauthorized: false} : false,
            },
        });
    }

    async findAll(creator: Creator): Promise<Recipe[]> {
        const recipeRows = await this.db('recipe')
            .select(
                'recipe.id as recipe_id',
                'recipe.name as recipe_name',
                'recipe.picture',
                'recipe.is_base',
                'auth.id as creator_id',
                'auth.first_name as creator_first_name',
                'auth.last_name as creator_last_name'
            )
            .leftJoin('auth', 'recipe.creator_id', 'auth.id')
            .where('recipe.creator_id', creator.id.getValue());

        const recipes: RecipeEntity[] = [];
        for (const row of recipeRows) {
            const creatorEntity = new CreatorEntity(
                row.creator_id,
                row.creator_first_name,
                row.creator_last_name
            )

            const recipeEntity = new RecipeEntity(
                row.recipe_id,
                row.recipe_name,
                row.picture,
                creatorEntity,
                row.is_base,
                [],
                []
            )
            recipes.push(recipeEntity);
        }

        return recipes.map(RecipeMapper.toDomain);
    }

    async findAllByBase(creator: Creator): Promise<Recipe[]> {
        const recipeRows = await this.db('recipe')
            .select(
                'recipe.id as recipe_id',
                'recipe.name as recipe_name',
                'recipe.picture',
                'recipe.is_base',
                'auth.id as creator_id',
                'auth.first_name as creator_first_name',
                'auth.last_name as creator_last_name'
            )
            .leftJoin('auth', 'recipe.creator_id', 'auth.id')
            .where('recipe.creator_id', creator.id.getValue())
            .andWhere('recipe.is_base', true);

        const recipes: RecipeEntity[] = [];
        for (const row of recipeRows) {
            const creatorEntity = new CreatorEntity(
                row.creator_id,
                row.creator_first_name,
                row.creator_last_name
            )

            const recipeEntity = new RecipeEntity(
                row.recipe_id,
                row.recipe_name,
                row.picture,
                creatorEntity,
                row.is_base,
                [],
                []
            )
            recipes.push(recipeEntity);
        }

        return recipes.map(RecipeMapper.toDomain);
    }

    async findById(recipeId: RecipeId): Promise<Recipe> {
        const row = await this.db('recipe')
            .select(
                'recipe.id as recipe_id',
                'recipe.name as recipe_name',
                'recipe.picture',
                'recipe.is_base',
                'auth.id as creator_id',
                'auth.first_name as creator_first_name',
                'auth.last_name as creator_last_name'
            )
            .leftJoin('auth', 'recipe.creator_id', 'auth.id')
            .where('recipe.id', recipeId.getValue())
            .first();

        if (!row) throw new Error('Recipe not found');

        const creatorEntity = new CreatorEntity(
            row.creator_id,
            row.creator_first_name,
            row.creator_last_name
        )

        const ingredients = await this.findIngredientsByRecipeId(recipeId);
        const steps = await this.findStepsByRecipeId(recipeId);
        const recipeEntity = new RecipeEntity(
            row.recipe_id,
            row.recipe_name,
            row.picture,
            creatorEntity,
            row.is_base,
            ingredients.map(IngredientMapper.toPersistence),
            steps.map(StepMapper.toPersistence),
        )
        return RecipeMapper.toDomain(recipeEntity);
    }

    async findIngredientsByRecipeId(recipeId: RecipeId): Promise<Ingredient[]> {
        const ingredientRows = await this.db('ingredient')
            .where('recipe_id', recipeId.getValue());

        return ingredientRows.map((ingredient) => IngredientMapper.toDomain(ingredient));
    }

    async findStepsByRecipeId(recipeId: RecipeId): Promise<Step[]> {
        const stepRows = await this.db('step')
            .where('recipe_id', recipeId.getValue())
            .orderBy('position', 'asc');

        const steps: StepEntity[] = [];
        for (const stepRow of stepRows) {
            const step = new StepEntity(
                stepRow.id,
                stepRow.position,
                stepRow.type,
                stepRow.description,
                stepRow.sub_recipe_id ? RecipeMapper.toPersistence(await this.findById(RecipeId.from(stepRow.sub_recipe_id))) : undefined,
            );
            steps.push(step);
        }

        return steps.map(StepMapper.toDomain);
    }

    async create(recipe: Recipe): Promise<Recipe> {
        await this.db('recipe').insert({
            name: recipe.name,
            picture: recipe.picture,
            creator_id: recipe.creator.id.getValue(),
            is_base: recipe.isBase,
        });
        return this.findById(recipe.id);
    }

    async save(recipe: Recipe): Promise<Recipe> {
        // Use a transaction for consistency
        await this.db.transaction(async trx => {
            // Update the recipe row
            await trx('recipe')
                .update({
                    name: recipe.name,
                    picture: recipe.picture,
                })
                .where('id', recipe.id.getValue());

            // Delete existing ingredients and steps for this recipe
            await trx('ingredient').where('recipe_id', recipe.id.getValue()).del();
            await trx('step').where('recipe_id', recipe.id.getValue()).del();

            // Insert current ingredients
            if (recipe.ingredients && recipe.ingredients.length > 0) {
                for (const ingredient of recipe.ingredients) {
                    await trx('ingredient').insert({
                        recipe_id: recipe.id.getValue(),
                        name: ingredient.name,
                        quantity: ingredient.unit.getValue(),
                        unit: ingredient.unit.getUnit().getValue(),
                    });
                }

            }

            // Insert current steps
            if (recipe.steps && recipe.steps.length > 0) {
                for (const step of recipe.steps) {
                    await trx('step').insert({
                        recipe_id: recipe.id.getValue(),
                        description: step.description ?? '',
                        position: step.position,
                        type: step.type,
                        sub_recipe_id: step.subRecipe ? step.subRecipe.id.getValue() : null,
                    });
                }
            }
        });
        return this.findById(recipe.id);
    }

    async archive(recipeId: RecipeId): Promise<Recipe[]> {
        await this.db('recipe')
            .update({deleted_at: this.db.fn.now()})
            .where('id', recipeId.getValue());
        return []
    }

    async deleteIngredientById(ingredientId: IngredientId): Promise<void> {
        return this.db('ingredient').where('id', ingredientId.getValue()).del();
    }

    async deleteStepById(stepId: StepId): Promise<void> {
        return this.db('step').where('id', stepId.getValue()).del();
    }

}