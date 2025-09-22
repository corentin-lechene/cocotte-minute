import {CreatorEntity} from "../entities/creator.entity";
import {Creator} from "../../../../domain/models/creator.model";
import {CreatorId} from "../../../../domain/value-objects/creator-id.vo";

export class CreatorMapper {
    static toDomain(entity: CreatorEntity): Creator {
        return {
            id: CreatorId.from(entity.id),
            firstName: entity.first_name,
            lastName: entity.last_name,
        };
    }

    static toPersistence(domain: Creator): CreatorEntity {
        return {
            id: domain.id.getValue(),
            first_name: domain.firstName,
            last_name: domain.lastName,
        };
    }
}