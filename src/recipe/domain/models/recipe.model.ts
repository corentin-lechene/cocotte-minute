import {RecipeId} from "../value-objects/recipe-id.vo";
import {RecipeDuration} from "../value-objects/recipe-duration.vo";
import {Ingredient} from "./ingredient.model";

export class Recipe {
    id: RecipeId;
    name: string;
    picture: string;
    ingredients: Ingredient[];
    // isBase: boolean;
    // cookingTime?: RecipeDuration;
    // setupTime?: RecipeDuration;
    // restTime?: RecipeDuration;

    constructor(
        id: RecipeId,
        name: string,
        picture: string,
        ingredients: Ingredient[] = [],
        // isBase: boolean,
        // cookingTime?: RecipeDuration,
        // setupTime?: RecipeDuration,
        // restTime?: RecipeDuration,
    ) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.ingredients = ingredients;
        // this.cookingTime = cookingTime;
        // this.setupTime = setupTime;
        // this.restTime = restTime;
        // this.isBase = isBase;
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
    }
}