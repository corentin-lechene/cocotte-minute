import {CreateRecipeUseCaseInterface} from "./ports/create-recipe-use-case.interface";
import {CreateRecipeRepository} from "./repository/create-recipe.repository";
import {RecipeFactory} from "../../domain/recipe/factories/recipe.factory";
import {CreateRecipeInput} from "./ports/create-recipe-dto.input";
import {CreateRecipeOutput} from "./ports/create-recipe-dto.output";

export class CreateRecipeUseCase implements CreateRecipeUseCaseInterface {
    constructor(
        private readonly createRecipeRepository: CreateRecipeRepository,
        private readonly recipeFactory: RecipeFactory,
    ) {}

    async execute(createRecipeRequest: CreateRecipeInput): Promise<CreateRecipeOutput> {
        const {name, picture} = createRecipeRequest;
        const recipe = this.recipeFactory.create(name, picture);

        const recipeSaved = await this.createRecipeRepository.create(recipe);

        return new CreateRecipeOutput(recipeSaved.id.getValue(), recipeSaved.name, recipeSaved.picture)
    }
}