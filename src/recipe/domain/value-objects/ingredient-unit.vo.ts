import {IngredientUnitType} from "./ingredient-unit-type.vo";

export class IngredientUnit {
    private readonly unit: IngredientUnitType;
    private readonly value: number;

    private constructor(value: number, unit: IngredientUnitType) {
        if (!value) {
            throw new Error('IngredientUnit value and unit cannot be empty');
        }
        if(!unit) {
            throw new Error('IngredientUnit unit cannot be empty');
        }
        this.value = value;
        this.unit = unit;
    }

    getValue(): number {
        return this.value;
    }

    getUnit(): IngredientUnitType {
        return this.unit;
    }

    public static from(value: number, unit: IngredientUnitType): IngredientUnit {
        return new IngredientUnit(value, unit);
    }

    equals(other: IngredientUnit): boolean {
        return this.value === other.value && this.unit.equals(other.unit);
    }
}