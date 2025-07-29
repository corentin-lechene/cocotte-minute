import {Recipe} from "../../../../domain/recipe/recipe.model";
import {RecipeEntity} from "../entities/recipe.entity";
import {RecipeId} from "../../../../domain/recipe/value-objects/recipe-id.vo";

export class RecipeMapper {
    static toDomain(entity: RecipeEntity): Recipe {
        return new Recipe(RecipeId.from(entity.id), entity.name, entity.picture);
    }

    static toPersistence(recipe: Recipe): RecipeEntity {
        return new RecipeEntity(recipe.id.getValue(), recipe.name, recipe.picture)
    }
}