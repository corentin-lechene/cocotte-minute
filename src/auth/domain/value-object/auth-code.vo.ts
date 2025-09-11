export class AuthCode {
    private readonly value: string;

    private constructor(value: string) {
        if (!/^\d{6}$/.test(value)) {
            throw new Error('AuthCode doit être composé de 6 chiffres');
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    static from(value: string): AuthCode {
        return new AuthCode(value);
    }

    equals(other: AuthCode): boolean {
        return this.value === other.value;
    }
}