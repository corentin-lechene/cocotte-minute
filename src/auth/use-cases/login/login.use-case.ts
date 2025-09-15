import { LoginUseCaseInterface } from "./ports/login-use-case.interface";
import { LoginInput } from "./ports/login-dto.input";
import { LoginOutput } from "./ports/login-dto.output";
import {AuthRepository} from "../../domain/repository/auth.repository";
import {AuthCodeExpiredError} from "../../domain/errors/auth.error";
import {TokenService} from "../../domain/services/token.service";

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
      private readonly authRepository: AuthRepository,
      private readonly tokenService: TokenService,
  ) {}

  async execute(loginInput: LoginInput): Promise<LoginOutput> {
    const { code } = loginInput;

    const userAuth = await this.authRepository.findUserByCode(code);
    if(userAuth.expiredAt) {
      throw new AuthCodeExpiredError();
    }

    const token = await this.tokenService.generate(userAuth.id);
    userAuth.token = token
    userAuth.expiredAt = new Date();

    await this.authRepository.saveUser(userAuth);

    return new LoginOutput(userAuth);
  }
}
