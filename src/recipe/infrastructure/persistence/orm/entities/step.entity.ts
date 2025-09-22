import {StepId} from "../../../../domain/value-objects/step-id.vo";
import {RecipeEntity} from "./recipe.entity";

export class StepEntity {
    id: StepId['value'];
    position: number;
    type: 'basic' | 'composite';
    description: string;
    sub_recipe?: RecipeEntity;

    constructor(id: StepId["value"], position: number, type: "basic" | "composite", description: string, subRecipe?: RecipeEntity) {
        this.id = id;
        this.position = position;
        this.type = type;
        this.description = description;
        this.sub_recipe = subRecipe;
    }
}