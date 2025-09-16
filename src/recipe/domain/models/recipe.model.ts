import {RecipeId} from "../value-objects/recipe-id.vo";
import {RecipeDuration} from "../value-objects/recipe-duration.vo";
import {Ingredient} from "./ingredient.model";
import {Step} from "./step.model";
import {Creator} from "./creator.model";

export class Recipe {
    id: RecipeId;
    name: string;
    picture: string;
    creator: Creator;
    ingredients: Ingredient[];
    steps: Step[];
    isBase: boolean;

    constructor(
        id: RecipeId,
        name: string,
        picture: string,
        creator: Creator,
        isBase: boolean = false,
        ingredients: Ingredient[] = [],
        steps: Step[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.creator = creator;
        this.isBase = isBase;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
    }

    addStep(step: Step): void {
        this.steps.push(step);
    }
}