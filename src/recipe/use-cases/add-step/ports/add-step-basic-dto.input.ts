import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

interface AddStepBasicDto {
    position: number;
    description: string;
}

export class AddStepBasicInput {
    constructor(
        public readonly recipeId: RecipeId,
        public readonly step: AddStepBasicDto
    ) {
    }
}
