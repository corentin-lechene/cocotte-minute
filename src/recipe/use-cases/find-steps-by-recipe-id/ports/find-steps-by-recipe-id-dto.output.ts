interface StepDto {
    id: string;
    position: number;
    description: string;
}

export class FindStepsByRecipeIdOutput {
  constructor(public readonly steps: StepDto[]) {}
}
