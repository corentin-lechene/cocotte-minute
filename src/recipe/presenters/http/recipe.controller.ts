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
import {AddIngredientInput} from "../../use-cases/add-ingredient/ports/add-ingredient-dto.input";
import {AddIngredientResponse} from "./dto/add-ingredient-response.dto";
import {AddIngredientRequest} from "./dto/add-ingredient-request.dto";
import {IngredientUnitType} from "../../domain/value-objects/ingredient-unit-type.vo";
import {IngredientUnit} from "../../domain/value-objects/ingredient-unit.vo";
import {AddIngredientUseCase} from "../../use-cases/add-ingredient/add-ingredient.use-case";

@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly findRecipeUseCase: FindRecipesUseCase,
        private readonly createRecipeUseCase: CreateRecipeUseCase,
        private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
        private readonly addIngredientUseCase: AddIngredientUseCase,
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

    @Post(':recipeId/ingredients')
    async addIngredient(
        @Param('recipeId') recipeId: string,
        @Body() requestDto: AddIngredientRequest,
    ): Promise<AddIngredientResponse> {
        try {
            const data: AddIngredientInput = {
                recipeId: RecipeId.from(recipeId),
                ingredient: {
                    name: requestDto.name,
                    unit: IngredientUnit.from(requestDto.quantity, IngredientUnitType.from(requestDto.unit)),
                },
            };
            return await this.addIngredientUseCase.execute(data);
        } catch (error) {
            console.error(error);
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
