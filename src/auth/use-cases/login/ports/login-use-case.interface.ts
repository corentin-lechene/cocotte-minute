import { LoginInput } from "./login-dto.input";
import { LoginOutput } from "./login-dto.output";

export abstract class LoginUseCaseInterface {
  abstract execute(loginInput: LoginInput): Promise<LoginOutput>;
}
