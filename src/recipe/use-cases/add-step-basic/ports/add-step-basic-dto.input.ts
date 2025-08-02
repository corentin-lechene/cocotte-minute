import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";
import {StepTip} from "../../../domain/value-objects/step-tip.vo";

interface AddStepBasicDto {
    description: string;
    position: number;
    title?: string;
    picture?: string;
    tip?: StepTip;
}

export class AddStepBasicInput {
    constructor(
        public readonly recipeId: RecipeId,
        public readonly step: AddStepBasicDto
    ) {
    }
}
