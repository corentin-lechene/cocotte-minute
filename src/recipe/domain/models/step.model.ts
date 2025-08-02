import {StepId} from "../value-objects/step-id.vo";
import {StepTip} from "../value-objects/step-tip.vo";

export class Step {
    id: StepId;
    description: string;
    position: number;
    title?: string;
    image?: string;
    tip?: StepTip;

    constructor(id: StepId, description: string, position: number, title?: string, image?: string, tip?: StepTip) {
        this.id = id;
        this.description = description;
        this.position = position;
        this.title = title;
        this.image = image;
        this.tip = tip;
    }
}