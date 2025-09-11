export class AuthId {
    private readonly value: string;

    private constructor(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('AuthId cannot be empty');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static generate(): AuthId {
        return new AuthId(Date.now().toString());
    }

    static from(value: string): AuthId {
        return new AuthId(value);
    }

    equals(other: AuthId): boolean {
        return this.value === other.value;
    }
}