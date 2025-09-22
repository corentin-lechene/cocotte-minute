export class IngredientUnitType {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || !['g', 'ml', 'piece'].includes(value)) {
            throw new Error(`Invalid IngredientUnitType value (${value})`);
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static from(value: string): IngredientUnitType {
        return new IngredientUnitType(value);
    }

    equals(other: IngredientUnitType): boolean {
        return this.value === other.value;
    }
}