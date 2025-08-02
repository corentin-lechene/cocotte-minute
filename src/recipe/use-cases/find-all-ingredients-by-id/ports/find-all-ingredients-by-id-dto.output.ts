interface IngredientDto {
    id: string;
    name: string;
    unit: string;
    quantity: number;
}

export class FindAllIngredientsByIdOutput {
  constructor(public readonly ingredients: IngredientDto[]) {}
}
