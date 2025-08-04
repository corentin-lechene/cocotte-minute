export class AddStepCompositeRequest {
    description: string;
    position: number;
    subRecipeId: string;

    constructor(description: string, position: number, subRecipeId: string) {
        this.description = description;
        this.position = position;
        this.subRecipeId = subRecipeId;
    }
}