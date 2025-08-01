export class RecipeTimeUnit {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || !['min', 'hour'].includes(value)) {
            throw new Error('Invalid RecipeTimeUnit value');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static from(value: string): RecipeTimeUnit {
        return new RecipeTimeUnit(value);
    }

    public static min(): RecipeTimeUnit {
        return new RecipeTimeUnit('min');
    }

    public static hour(): RecipeTimeUnit {
        return new RecipeTimeUnit('hour');
    }

    equals(other: RecipeTimeUnit): boolean {
        return this.value === other.value;
    }
}