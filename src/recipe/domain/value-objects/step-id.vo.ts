export class StepId {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('StepId cannot be empty');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static generate(): StepId {
        return new StepId(Date.now().toString());
    }

    static from(value: string): StepId {
        return new StepId(value);
    }

    equals(other: StepId): boolean {
        return this.value === other.value;
    }
}