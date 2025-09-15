export class LoginResponse {
    constructor(
        public readonly id: string,
        public readonly token: string,
    ) {
    }
}