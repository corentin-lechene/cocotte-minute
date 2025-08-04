import {IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';

export class CreateRecipeRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    picture: string;

    @IsBoolean()
    @IsOptional()
    isBase?: boolean;

    constructor(name: string, picture: string, isBase: boolean) {
        this.name = name;
        this.picture = picture;
        this.isBase = isBase;
    }
}