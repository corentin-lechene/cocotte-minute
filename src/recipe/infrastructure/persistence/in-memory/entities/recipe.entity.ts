import {RecipeId} from "../../../../domain/recipe/value-objects/recipe-id.vo";

export class RecipeEntity {
    id: RecipeId['value'];
    name: string;
    picture: string;

    constructor(id: RecipeId['value'], name: string, picture: string) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }
}