import {CreatorId} from "../value-objects/creator-id.vo";
import {Actor} from "../../../common/interfaces/execution-context-user.interface";

export class Creator {
    id: CreatorId;
    firstName: string;
    lastName: string;

    constructor(id: CreatorId, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //todo: remove this
    static fromActor(actor: Actor): Creator {
        return new Creator(CreatorId.from(actor.id), actor.firstName, actor.lastName);
    }
}