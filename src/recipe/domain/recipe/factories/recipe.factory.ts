import {RecipeId} from "../value-objects/recipe-id.vo";
import {Recipe} from "../recipe.model";

export class RecipeFactory {
    create(name: string, picture: string): Recipe {
        const id = RecipeId.generate();
        return new Recipe(id, name, picture);
    }
}