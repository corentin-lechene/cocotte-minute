import {IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString} from 'class-validator';

enum IngredientUnit {
    GRAMS = 'g',
    MILLILITERS = 'ml',
    PIECES = 'piece',
}

export class AddIngredientRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsPositive()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsEnum(IngredientUnit)
    unit: string;

    constructor(name: string, quantity: number, unit: IngredientUnit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}