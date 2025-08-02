import {FindStepsByRecipeIdUseCaseInterface} from "./ports/find-steps-by-recipe-id-use-case.interface";
import {FindStepsByRecipeIdInput} from "./ports/find-steps-by-recipe-id-dto.input";
import {FindStepsByRecipeIdOutput} from "./ports/find-steps-by-recipe-id-dto.output";
import {RecipeReadRepository} from "../../domain/repository/recipe-read.repository";

export class FindStepsByRecipeIdUseCase implements FindStepsByRecipeIdUseCaseInterface {
    constructor(private readonly recipeReadRepository: RecipeReadRepository) {
    }

    async execute(findStepsByRecipeIdInput: FindStepsByRecipeIdInput): Promise<FindStepsByRecipeIdOutput> {
        const {recipeId} = findStepsByRecipeIdInput;

        const steps = await this.recipeReadRepository.findStepsByRecipeId(recipeId);
        return new FindStepsByRecipeIdOutput(steps.map((step) => ({
            id: step.id.getValue(),
            description: step.description,
            position: step.position,
            title: step.title,
            image: step.image,
            tip: step.tip?.getObject() ?? null,
        })));
    }
}
