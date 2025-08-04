interface RecipeDto {
    id: string
    name: string
    picture: string
    isRecipeBase: boolean
}

export class FindRecipesOutput {
    constructor(public recipes: RecipeDto[]) {}
}