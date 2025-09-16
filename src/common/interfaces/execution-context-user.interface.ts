export class Actor {
    constructor(
        readonly id: string,
        readonly token: string,
        readonly firstName: string, //todo: remove this
        readonly lastName: string, //todo: remove this
    ) {
    }
}

//todo: rename to ExecutionContext
export class ExecutionContextUser {
    constructor(
        readonly actor: Actor,
    ) {}
}