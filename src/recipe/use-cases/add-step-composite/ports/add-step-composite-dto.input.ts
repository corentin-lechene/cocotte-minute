import {RecipeId} from "../../../domain/value-objects/recipe-id.vo";

export class AddStepCompositeInput {
    constructor(
        public readonly recipeId: RecipeId,
        public readonly step: {
            position: number,
            description: string;
            subRecipeId: RecipeId;
        }
    ) {
    }
}
