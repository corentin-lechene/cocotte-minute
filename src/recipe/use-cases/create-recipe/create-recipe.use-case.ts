import {CreateRecipeUseCaseInterface} from "./ports/create-recipe-use-case.interface";
import {RecipeWriteRepository} from "../../domain/repository/recipe-write.repository";
import {RecipeFactory} from "../../domain/factories/recipe.factory";
import {CreateRecipeInput} from "./ports/create-recipe-dto.input";
import {CreateRecipeOutput} from "./ports/create-recipe-dto.output";
import {ExecutionContextUser} from "../../../common/interfaces/execution-context-user.interface";
import {Creator} from "../../domain/models/creator.model";
import {CreatorId} from "../../domain/value-objects/creator-id.vo";

export class CreateRecipeUseCase implements CreateRecipeUseCaseInterface {
    constructor(
        private readonly recipeWriteRepository: RecipeWriteRepository,
        private readonly recipeFactory: RecipeFactory,
    ) {}

    async execute(createRecipeRequest: CreateRecipeInput, executionContextUser: ExecutionContextUser): Promise<CreateRecipeOutput> {
        const {name, picture, isBase} = createRecipeRequest;
        const {actor} = executionContextUser;

        const creator = new Creator(CreatorId.from(actor.id), actor.firstName, actor.lastName);
        const recipe = isBase
            ? this.recipeFactory.createBase(name, picture, creator)
            : this.recipeFactory.create(name, picture, creator);

        const recipeSaved = await this.recipeWriteRepository.create(recipe);

        return new CreateRecipeOutput(recipeSaved.id.getValue(), recipeSaved.name, recipeSaved.picture, recipeSaved.isBase);
    }
}