import {StepId} from "../../../../domain/value-objects/step-id.vo";

export class StepEntity {
    id: StepId['value'];
    position: number;
    type: 'basic' | 'composite';
    description: string;


    constructor(id: StepId["value"], position: number, type: "basic" | "composite", description: string) {
        this.id = id;
        this.position = position;
        this.type = type;
        this.description = description;
    }
}