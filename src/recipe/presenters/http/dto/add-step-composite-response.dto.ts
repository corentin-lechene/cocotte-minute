interface StepRecipeDto {
    id: string;
    name: string;
    steps: Array<{
        id: string;
        position: number;
        type: "basic" | "composite";
        description: string;
        subRecipe?: StepRecipeDto;
    }>;
}

export class AddStepCompositeResponse {
    constructor(
        public readonly id: string,
        public readonly position: number,
        public readonly type: "basic" | "composite",
        public readonly description: string,
        public readonly recipe: StepRecipeDto,
    ) {
    }
}