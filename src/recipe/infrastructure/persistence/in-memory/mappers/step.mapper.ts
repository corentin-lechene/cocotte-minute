import {Step} from "../../../../domain/models/step.model";
import {StepEntity} from "../entities/step.entity";
import {StepId} from "../../../../domain/value-objects/step-id.vo";
import {StepTip} from "../../../../domain/value-objects/step-tip.vo";
import {StepTipSeverity} from "../../../../domain/value-objects/step-tip-severity.vo";

export class StepMapper {
    static toDomain(entity: StepEntity): Step {
        return new Step(
            StepId.from(entity.id),
            entity.description,
            entity.position,
            entity.title,
            entity.image,
            entity.tip && entity.tipSeverity
                ? StepTip.from(entity.tip, StepTipSeverity.from(entity.tipSeverity))
                : undefined,
        );
    }

    static toPersistence(step: Step): StepEntity {
        return new StepEntity(
            step.id.getValue(),
            step.description,
            step.position,
            step.title,
            step.image,
            step.tip ? step.tip.getValue() : undefined,
            step.tip ? step.tip.getSeverity().getValue() : undefined,
        );
    }
}