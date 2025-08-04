interface StepDto {
    id: string;
    position: number;
    type: "basic" | "composite";
    description: string;
    subRecipe?: {
        id: string;
        name: string;
        steps: StepDto[];
    }
}

export class FindStepsByRecipeIdOutput {
  constructor(public readonly steps: StepDto[]) {}
}
