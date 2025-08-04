export class AddStepBasicResponse {
    constructor(
        public readonly id: string,
        public readonly position: number,
        public readonly type: "basic" | "composite",
        public readonly description: string,
    ) {
    }
}