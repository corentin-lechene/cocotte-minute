export class CreateRecipeInput {
    name: string;
    picture: string;
    isBase?: boolean;

    constructor(name: string, picture: string, isBase: boolean = false) {
        this.name = name;
        this.picture = picture;
        this.isBase = isBase;
    }
}