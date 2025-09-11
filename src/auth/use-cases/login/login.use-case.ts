import { LoginUseCaseInterface } from "./ports/login-use-case.interface";
import { LoginInput } from "./ports/login-dto.input";
import { LoginOutput } from "./ports/login-dto.output";
import {AuthRepository} from "../../domain/repository/auth.repository";
import {AuthCodeExpiredError} from "../../domain/errors/auth.error";

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(loginInput: LoginInput): Promise<LoginOutput> {
    const { code } = loginInput;

    const userAuth = await this.authRepository.findUserByCode(code);
    if(userAuth.expiredAt) {
      throw new AuthCodeExpiredError();
    }
    await this.authRepository.setUserCodeToExpired(userAuth);
    return new LoginOutput(userAuth);
  }
}
