import {CreatorId} from "../../../../domain/value-objects/creator-id.vo";

export class CreatorEntity {
    id: CreatorId['value'];
    first_name: string;
    last_name: string;

    constructor(id: CreatorId['value'], firstName: string, lastName: string) {
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
    }
}