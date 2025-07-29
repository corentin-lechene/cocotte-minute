import {BadRequestException, Body, Controller, Get, Post} from '@nestjs/common';
import {FindRecipesUseCase} from "../../../use-cases/recipes/find-recipes/find-recipes.use-case";
import {CreateRecipeUseCase} from "../../../use-cases/recipes/create-recipe/create-recipe.use-case";
import {CreateRecipeRequest} from "./dto/create-recipe-request.dto";
import {CreateRecipeResponse} from "./dto/create-recipe-response.dto";
import {CreateRecipeInput} from "../../../use-cases/recipes/create-recipe/ports/create-recipe-dto.input";

@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly findRecipeUseCase: FindRecipesUseCase,
        private readonly createRecipeUseCase: CreateRecipeUseCase,
    ) {}

    @Get()
    async findRecipes() {
        try {
            return await this.findRecipeUseCase.execute({});
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Post()
    async createRecipe(@Body() requestDto: CreateRecipeRequest): Promise<CreateRecipeResponse> {
        try {
            const data: CreateRecipeInput = {
                name: requestDto?.name,
                picture: requestDto?.picture,
            }
            return await this.createRecipeUseCase.execute(data);
        } catch (error) {
            console.error(error)
            if(error instanceof UseCaseError) {
                throw HTTPExceptionMapper.toHttpException(error);
            }
            throw new BadRequestException(error);
        }
    }
}
