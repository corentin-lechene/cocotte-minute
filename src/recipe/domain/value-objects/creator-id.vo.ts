export class CreatorId {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('CreatorId cannot be empty');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static generate(): CreatorId {
        return new CreatorId(Date.now().toString());
    }

    static from(value: string): CreatorId {
        return new CreatorId(value);
    }

    equals(other: CreatorId): boolean {
        return this.value === other.value;
    }
}