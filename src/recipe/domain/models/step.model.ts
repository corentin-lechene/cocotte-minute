import {StepId} from "../value-objects/step-id.vo";
import {Recipe} from "./recipe.model";

export class Step {
    id: StepId;
    position: number;
    type: "basic" | "composite";
    description: string;
    subRecipe?: Recipe;

    constructor(id: StepId, position: number, type: "basic" | "composite", description: string, subRecipe?: Recipe) {
        this.id = id;
        this.position = position;
        this.type = type;
        this.description = description;
        this.subRecipe = subRecipe;
    }
}