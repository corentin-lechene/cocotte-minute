export class CreateRecipeOutput {
    id: string;
    name: string;
    picture: string;
    isBase: boolean;

    constructor(id: string, name: string, picture: string, isBase: boolean) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.isBase = isBase;
    }
}