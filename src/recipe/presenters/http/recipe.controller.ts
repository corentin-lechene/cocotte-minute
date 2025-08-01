import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get, Param,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {FindRecipesUseCase} from "../../use-cases/find-recipes/find-recipes.use-case";
import {CreateRecipeUseCase} from "../../use-cases/create-recipe/create-recipe.use-case";
import {CreateRecipeRequest} from "./dto/create-recipe-request.dto";
import {CreateRecipeResponse} from "./dto/create-recipe-response.dto";
import {CreateRecipeInput} from "../../use-cases/create-recipe/ports/create-recipe-dto.input";
import {DeleteRecipeUseCase} from "../../use-cases/delete-recipe/delete-recipe.use-case";
import {RecipeId} from "../../domain/value-objects/recipe-id.vo";

@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly findRecipeUseCase: FindRecipesUseCase,
        private readonly createRecipeUseCase: CreateRecipeUseCase,
        private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
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
    @UsePipes(new ValidationPipe({ transform: true }))
    async createRecipe(@Body() requestDto: CreateRecipeRequest): Promise<CreateRecipeResponse> {
        try {
            const data: CreateRecipeInput = {
                name: requestDto.name,
                picture: requestDto.picture,
            }
            return await this.createRecipeUseCase.execute(data);
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error);
        }
    }

    @Delete(':recipeId')
    async deleteRecipe(@Param('recipeId') recipeId: string) {
        try {
            return await this.deleteRecipeUseCase.execute({ recipeId: RecipeId.from(recipeId) });
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error);
        }
    }
}
