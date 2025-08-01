import {CreateRecipeUseCaseInterface} from "./ports/create-recipe-use-case.interface";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {CreateRecipeInput} from "./ports/create-recipe-dto.input";
import {CreateRecipeOutput} from "./ports/create-recipe-dto.output";

export class CreateRecipeUseCase implements CreateRecipeUseCaseInterface {
    constructor(
        private readonly recipeWriteRepository: RecipeWriteRepository,
        private readonly recipeFactory: RecipeFactory,
    ) {}

    async execute(createRecipeRequest: CreateRecipeInput): Promise<CreateRecipeOutput> {
        const {name, picture} = createRecipeRequest;
        const recipe = this.recipeFactory.create(name, picture);

        const recipeSaved = await this.recipeWriteRepository.create(recipe);

        return new CreateRecipeOutput(recipeSaved.id.getValue(), recipeSaved.name, recipeSaved.picture)
    }
}