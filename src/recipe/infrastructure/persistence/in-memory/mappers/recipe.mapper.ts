import {Recipe} from "../../../../domain/models/recipe.model";
import {RecipeEntity} from "../entities/recipe.entity";
import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {IngredientMapper} from "./ingredient.mapper";
import {StepMapper} from "./step.mapper";
import {Creator} from "../../../../domain/models/creator.model";
import {CreatorId} from "../../../../domain/value-objects/creator-id.vo";
import {CreatorMapper} from "./creator.mapper";

export class RecipeMapper {
    static toDomain(entity: RecipeEntity): Recipe {
        return new Recipe(
            RecipeId.from(entity.id),
            entity.name,
            entity.picture,
            CreatorMapper.toDomain(entity.creator),
            entity.isBase,
            entity.ingredients.map((ingredientEntity) => IngredientMapper.toDomain(ingredientEntity)),
            entity.steps.map((stepEntity) => StepMapper.toDomain(stepEntity)),
        );
    }

    static toPersistence(recipe: Recipe): RecipeEntity {
        return new RecipeEntity(
            recipe.id.getValue(),
            recipe.name,
            recipe.picture,
            CreatorMapper.toPersistence(recipe.creator),
            recipe.isBase,
            recipe.ingredients.map((ingredient) => IngredientMapper.toPersistence(ingredient)),
            recipe.steps.map((step) => StepMapper.toPersistence(step)),
        );
    }
}