import {Step} from "../../../../domain/models/step.model";
import {StepEntity} from "../entities/step.entity";
import {StepId} from "../../../../domain/value-objects/step-id.vo";
import {RecipeMapper} from "./recipe.mapper";

export class StepMapper {
    static toDomain(entity: StepEntity): Step {
        return new Step(
            StepId.from(entity.id),
            entity.position,
            entity.type as "basic" | "composite",
            entity.description,
            entity.sub_recipe ? RecipeMapper.toDomain(entity.sub_recipe) : undefined
        )
    }

    static toPersistence(step: Step): StepEntity {
        return new StepEntity(
            step.id.getValue(),
            step.position,
            step.type,
            step.description,
            step.subRecipe ? RecipeMapper.toPersistence(step.subRecipe) : undefined
        );
    }
}