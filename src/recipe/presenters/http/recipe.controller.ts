import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get, Headers, Param,
    Post, Query, UseGuards,
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
import {
    FindIngredientsByRecipeIdUseCase
} from "../../use-cases/find-all-ingredients-by-id/find-ingredients-by-recipe-id-use.case";
import {IngredientId} from "../../domain/value-objects/ingredient-id.vo";
import {
    DeleteIngredientByRecipeIdUseCase
} from "../../use-cases/delete-ingredient-by-recipe-id/delete-ingredient-by-recipe-id.use-case";
import {FindStepsByRecipeIdUseCase} from "../../use-cases/find-steps-by-recipe-id/find-steps-by-recipe-id.use-case";
import {AddStepUseCase} from "../../use-cases/add-step/add-step-use.case";
import {AddStepBasicResponse} from "./dto/add-step-basic-response.dto";
import {AddStepBasicRequest} from "./dto/add-step-basic-request.dto";
import {AddStepCompositeUseCase} from "../../use-cases/add-step-composite/add-step-composite.use-case";
import {AddStepCompositeRequest} from "./dto/add-step-composite-request.dto";
import {AddStepCompositeResponse} from "./dto/add-step-composite-response.dto";
import {
    ExecutionContextUserDecorator
} from "../../../auth/infrastructure/nest/decorators/execution-context-user.decorator";
import {ExecutionContextUser} from "../../../common/interfaces/execution-context-user.interface";
import {ExecutionContextUserGuard} from "../../../auth/infrastructure/nest/guards/execution-context-user.guard";

@Controller('recipes')
export class RecipeController {
    constructor(
        private readonly findRecipeUseCase: FindRecipesUseCase,
        private readonly createRecipeUseCase: CreateRecipeUseCase,
        private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
        private readonly addIngredientUseCase: AddIngredientUseCase,
        private readonly findIngredientsByRecipeIdUseCase: FindIngredientsByRecipeIdUseCase,
        private readonly deleteIngredientByRecipeIdUseCase: DeleteIngredientByRecipeIdUseCase,
        private readonly findStepsByRecipeIdUseCase: FindStepsByRecipeIdUseCase,
        private readonly addStepBasicUseCase: AddStepUseCase,
        private readonly addStepCompositeUseCase: AddStepCompositeUseCase,
    ) {}

    @Get()
    async findRecipes(@Query('base') isRecipeBase?: string): Promise<any> {
        try {
            return await this.findRecipeUseCase.execute({
                isRecipeBase: isRecipeBase === 'true' ? true : isRecipeBase === 'false' ? false : undefined,
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Get(':recipeId/ingredients')
    async findIngredientsByRecipeId(@Param('recipeId') recipeId: string) {
        try {
            return await this.findIngredientsByRecipeIdUseCase.execute({ recipeId: RecipeId.from(recipeId) });
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    @Get(':recipeId/steps')
    async findStepsByRecipeId(@Param('recipeId') recipeId: string) {
        try {
            return await this.findStepsByRecipeIdUseCase.execute({ recipeId: RecipeId.from(recipeId) });
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(ExecutionContextUserGuard)
    async createRecipe(
        @Body() requestDto: CreateRecipeRequest,
        @ExecutionContextUserDecorator() executionContextUser: ExecutionContextUser
    ): Promise<CreateRecipeResponse> {
        try {
            const data: CreateRecipeInput = {
                name: requestDto.name,
                picture: requestDto.picture,
                isBase: requestDto.isBase,
            }
            return await this.createRecipeUseCase.execute(data, executionContextUser);
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

    @Post(':recipeId/steps')
    async addStepBasic(
        @Param('recipeId') recipeId: string,
        @Body() requestDto: AddStepBasicRequest,
    ): Promise<AddStepBasicResponse> {
        try {
            return await this.addStepBasicUseCase.execute({
                recipeId: RecipeId.from(recipeId),
                step: {
                    position: requestDto.position,
                    description: requestDto.description,
                }
            });
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    @Post(':recipeId/steps/composite')
    async addStepComposite(
        @Param('recipeId') recipeId: string,
        @Body() requestDto: AddStepCompositeRequest,
    ): Promise<AddStepCompositeResponse> {
        try {
            return await this.addStepCompositeUseCase.execute({
                recipeId: RecipeId.from(recipeId),
                step: {
                    position: requestDto.position,
                    description: requestDto.description,
                    subRecipeId: RecipeId.from(requestDto.subRecipeId),
                }
            });
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

    @Delete(':recipeId/ingredients/:ingredientId')
    async deleteIngredient(
        @Param('recipeId') recipeId: string,
        @Param('ingredientId') ingredientId: string,
    ): Promise<void> {
        try {
            const recipeIdValue = RecipeId.from(recipeId);
            const ingredientIdValue = IngredientId.from(ingredientId);
            await this.deleteIngredientByRecipeIdUseCase.execute({
                recipeId: recipeIdValue,
                ingredientId: ingredientIdValue
            });
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }
}
