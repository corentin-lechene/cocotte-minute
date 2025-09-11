import {UserAuth} from "../../../domain/models/auth.model";

export class LoginOutput {
  constructor(public userAuth: UserAuth) {}
}
