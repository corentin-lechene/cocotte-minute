import {AuthCode} from "../../../domain/value-object/auth-code.vo";

export class LoginInput {
  constructor(public readonly code: AuthCode) {}
}
