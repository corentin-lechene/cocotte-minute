import {StepId} from "../../../../domain/value-objects/step-id.vo";
import {StepTip} from "../../../../domain/value-objects/step-tip.vo";

export class StepEntity {
    id: StepId['value'];
    description: string;
    position: number;
    title?: string;
    image?: string;
    tip?: StepTip['value'];
    tipSeverity?: StepTip['severity']['value'];

    constructor(id: StepId['value'], description: string, position: number, title?: string, image?: string, tip?: StepTip['value'], tipSeverity?: StepTip['severity']['value']) {
        this.id = id;
        this.description = description;
        this.position = position;
        this.title = title;
        this.image = image;
        this.tip = tip;
        this.tipSeverity = tipSeverity;
    }
}