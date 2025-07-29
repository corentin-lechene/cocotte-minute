export class RecipeId {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('RecipeId cannot be empty');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static generate(): RecipeId {
        return new RecipeId("fake-id");
    }

    static from(value: string): RecipeId {
        return new RecipeId(value);
    }
}