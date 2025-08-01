import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class CreateRecipeRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    picture: string;

    constructor(name: string, picture: string) {
        this.name = name;
        this.picture = picture;
    }
}