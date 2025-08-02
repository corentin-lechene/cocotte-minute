export class StepTipSeverity {
    private readonly value: string;
    private static readonly validValues = ['info', 'warning', 'error'];

    private constructor(value: string) {
        if (!value || !StepTipSeverity.validValues.includes(value)) {
            throw new Error(`Invalid StepTipSeverity value: ${value}`);
        }
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    public static from(value: string): StepTipSeverity {
        return new StepTipSeverity(value);
    }

    public static info(): StepTipSeverity {
        return new StepTipSeverity('info');
    }

    public static warning(): StepTipSeverity {
        return new StepTipSeverity('warning');
    }

    public static error(): StepTipSeverity {
        return new StepTipSeverity('error');
    }

    equals(other: StepTipSeverity): boolean {
        return this.value === other.value;
    }
}