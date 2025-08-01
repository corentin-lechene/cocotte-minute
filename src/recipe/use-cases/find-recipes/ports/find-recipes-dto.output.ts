interface RecipeDto {
    id: string
    name: string
    picture: string
}

export class FindRecipesOutput {
    constructor(public recipes: RecipeDto[]) {}
}