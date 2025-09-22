import {RecipeId} from "../../../../domain/value-objects/recipe-id.vo";
import {IngredientEntity} from "./ingredient.entity";
import {StepEntity} from "./step.entity";
import {CreatorEntity} from "./creator.entity";

export class RecipeEntity {
    id: RecipeId['value'];
    name: string;
    picture: string;
    is_base: boolean;
    creator: CreatorEntity;
    ingredients: IngredientEntity[]
    steps: StepEntity[];
    deleted_at?: Date;

    constructor(id: RecipeId['value'], name: string, picture: string, creator: CreatorEntity, isBase: boolean, ingredients: IngredientEntity[], steps: StepEntity[], deleted_at?: Date) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.creator = creator;
        this.is_base = isBase;
        this.ingredients = ingredients;
        this.steps = steps;
        this.deleted_at = deleted_at;
    }
}