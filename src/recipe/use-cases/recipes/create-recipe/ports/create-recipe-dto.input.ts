export class CreateRecipeInput {
    name: string;
    picture: string;

    constructor(name: string, picture: string) {
        this.name = name;
        this.picture = picture;
    }
}