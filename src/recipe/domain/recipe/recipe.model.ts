import {RecipeId} from "./value-objects/recipe-id.vo";
import {RecipeDuration} from "./value-objects/recipe-duration.vo";

export class Recipe {
    id: RecipeId;
    name: string;
    picture: string;
    // isBase: boolean;
    // cookingTime?: RecipeDuration;
    // setupTime?: RecipeDuration;
    // restTime?: RecipeDuration;

    constructor(
        id: RecipeId,
        name: string,
        picture: string,
        // isBase: boolean,
        // cookingTime?: RecipeDuration,
        // setupTime?: RecipeDuration,
        // restTime?: RecipeDuration,
    ) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        // this.cookingTime = cookingTime;
        // this.setupTime = setupTime;
        // this.restTime = restTime;
        // this.isBase = isBase;
    }
}