import {UserAuth} from "../../../domain/models/auth.model";

export class GetProfileOutput {
  constructor(public userAuth: UserAuth) {}
}
