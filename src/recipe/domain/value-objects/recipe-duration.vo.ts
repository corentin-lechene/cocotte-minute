import {RecipeTimeUnit} from "./recipe-unit.vo";

export class RecipeDuration {
    private readonly unit: RecipeTimeUnit;
    private readonly value: number;

    private constructor(value: number, unit: RecipeTimeUnit) {
        if (value < 0) {
            throw new Error('RecipeDuration value cannot be negative');
        }
        if (!unit.getValue()) {
            throw new Error('RecipeDuration unit cannot be empty');
        }
        this.value = value;
        this.unit = unit;
    }

    getValue(): number {
        return this.value;
    }

    getUnit(): RecipeTimeUnit {
        return this.unit;
    }

    public static from(value: number, unit: RecipeTimeUnit): RecipeDuration {
        return new RecipeDuration(value, unit);
    }

    equals(other: RecipeDuration): boolean {
        return this.value === other.value && this.unit.equals(other.unit);
    }
}