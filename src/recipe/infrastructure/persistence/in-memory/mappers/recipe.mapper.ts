import {Recipe} from "../../../../domain/models/recipe.model";
import {RecipeEntity} from "../entities/recipe.entity";
import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {IngredientMapper} from "./ingredient.mapper";
import {StepMapper} from "./step.mapper";

export class RecipeMapper {
    static toDomain(entity: RecipeEntity): Recipe {
        return new Recipe(
            RecipeId.from(entity.id),
            entity.name,
            entity.picture,
            entity.ingredients.map((ingredientEntity) => IngredientMapper.toDomain(ingredientEntity)),
            entity.steps.map((stepEntity) => StepMapper.toDomain(stepEntity)),
        );
    }

    static toPersistence(recipe: Recipe): RecipeEntity {
        return new RecipeEntity(
            recipe.id.getValue(),
            recipe.name,
            recipe.picture,
            recipe.ingredients.map((ingredient) => IngredientMapper.toPersistence(ingredient)),
            recipe.steps.map((step) => StepMapper.toPersistence(step)),
        );
    }
}