import {IngredientEntity} from "../entities/ingredient.entity";
import {Ingredient} from "../../../../domain/models/ingredient.model";
import {IngredientId} from "../../../../domain/value-objects/ingredient-id.vo";
import {IngredientUnitType} from "../../../../domain/value-objects/ingredient-unit-type.vo";
import {IngredientUnit} from "../../../../domain/value-objects/ingredient-unit.vo";

export class IngredientMapper {
    static toDomain(entity: IngredientEntity): Ingredient {
        return new Ingredient(
            IngredientId.from(entity.id),
            entity.name,
            IngredientUnit.from(entity.quantity, IngredientUnitType.from(entity.unit))
        );
    }

    static toPersistence(ingredient: Ingredient): IngredientEntity {
        return new IngredientEntity(
            ingredient.id.getValue(),
            ingredient.name,
            ingredient.unit.getValue(),
            ingredient.unit.getUnit().getValue(),
            ingredient.id.getValue(),
        );
    }
}