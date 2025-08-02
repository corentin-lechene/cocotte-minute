import {StepTipSeverity} from "./step-tip-severity.vo";

export class StepTip {
    private readonly value: string;
    private readonly severity: StepTipSeverity;

    private constructor(value: string, severity: StepTipSeverity) {
        if (!value || value.trim() === '') {
            throw new Error('StepTip cannot be empty');
        }

        this.value = value;
        this.severity = severity;
    }

    getValue(): string {
        return this.value;
    }

    getSeverity(): StepTipSeverity {
        return this.severity;
    }

    getObject() {
        return {
            description: this.value,
            severity: this.severity.getValue()
        };
    }

    public static from(value: string, severity: StepTipSeverity): StepTip {
        return new StepTip(value, severity);
    }
}