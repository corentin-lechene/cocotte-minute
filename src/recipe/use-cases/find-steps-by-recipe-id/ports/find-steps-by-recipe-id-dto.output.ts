interface StepDto {
    id: string;
    description: string;
    position: number;
    title?: string;
    image?: string;
    tip?: {
        description: string;
        severity: string;
    } | null;
}

export class FindStepsByRecipeIdOutput {
  constructor(public readonly steps: StepDto[]) {}
}
