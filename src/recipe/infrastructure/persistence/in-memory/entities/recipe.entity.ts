import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {IngredientEntity} from "./ingredient.entity";
import {StepEntity} from "./step.entity";
import {CreatorEntity} from "./creator.entity";

export class RecipeEntity {
    id: RecipeId['value'];
    name: string;
    picture: string;
    isBase: boolean;
    creator: CreatorEntity;
    ingredients: IngredientEntity[]
    steps: StepEntity[];

    constructor(id: RecipeId['value'], name: string, picture: string, creator: CreatorEntity, isBase: boolean, ingredients: IngredientEntity[], steps: StepEntity[]) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.creator = creator;
        this.isBase = isBase;
        this.ingredients = ingredients;
        this.steps = steps;
    }
}