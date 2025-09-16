import {CreatorEntity} from "../entities/creator.entity";
import {Creator} from "../../../../domain/models/creator.model";
import {CreatorId} from "../../../../domain/value-objects/creator-id.vo";

export class CreatorMapper {
    static toDomain(entity: CreatorEntity): Creator {
        return {
            id: CreatorId.from(entity.id),
            firstName: entity.firstName,
            lastName: entity.lastName,
        };
    }

    static toPersistence(domain: Creator): CreatorEntity {
        return {
            id: domain.id.getValue(),
            firstName: domain.firstName,
            lastName: domain.lastName,
        };
    }
}