export class AddStepBasicOutput {
    constructor(
        public readonly id: string,
        public readonly description: string,
        public readonly position: number,
        public readonly title?: string,
        public readonly picture?: string,
        public readonly tip?: {
            description: string;
            severity: string;
        }
    ) {
    }
}
