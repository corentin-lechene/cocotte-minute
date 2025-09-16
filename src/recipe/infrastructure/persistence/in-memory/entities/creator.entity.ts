import {CreatorId} from "../../../../domain/value-objects/creator-id.vo";

export class CreatorEntity {
    id: CreatorId['value'];
    firstName: string;
    lastName: string;

    constructor(id: CreatorId['value'], firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}