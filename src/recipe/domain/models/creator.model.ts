import {CreatorId} from "../value-objects/creator-id.vo";

export class Creator {
    id: CreatorId;
    firstName: string;
    lastName: string;

    constructor(id: CreatorId, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}