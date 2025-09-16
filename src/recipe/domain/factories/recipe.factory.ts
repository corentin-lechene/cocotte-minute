import {RecipeId} from "../value-objects/recipe-id.vo";
import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {IngredientUnit} from "../value-objects/ingredient-unit.vo";
import {IngredientId} from "../value-objects/ingredient-id.vo";
import {Step} from "../models/step.model";
import {StepId} from "../value-objects/step-id.vo";
import {Creator} from "../models/creator.model";

export class RecipeFactory {
    create(name: string, picture: string, creator: Creator): Recipe {
        const id = RecipeId.generate();
        return new Recipe(id, name, picture, creator);
    }

    createBase(name: string, picture: string, creator: Creator): Recipe {
        const id = RecipeId.generate();
        return new Recipe(id, name, picture, creator);
    }

    createIngredient(name: string, unit: IngredientUnit): Ingredient {
        const id = IngredientId.generate();
        return new Ingredient(id, name, unit);
    }

    createStep(position: number, description: string): Step {
        const id = StepId.generate();
        return new Step(id, position, "basic", description);
    }

    createStepSubRecipe(position: number, description: string, subRecipe: Recipe): Step {
        const id = StepId.generate();
        return new Step(id, position, "composite", description, subRecipe);
    }
}