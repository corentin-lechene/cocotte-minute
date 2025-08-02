export class IngredientId {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('IngredientId cannot be empty');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static generate(): IngredientId {
        return new IngredientId(Date.now().toString());
    }

    static from(value: string): IngredientId {
        return new IngredientId(value);
    }

    equals(other: IngredientId): boolean {
        return this.value === other.value;
    }
}