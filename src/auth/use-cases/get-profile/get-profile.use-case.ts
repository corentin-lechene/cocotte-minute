import { GetProfileUseCaseInterface } from "./ports/get-profile-use-case.interface";
import { GetProfileInput } from "./ports/get-profile-dto.input";
import { GetProfileOutput } from "./ports/get-profile-dto.output";
import {AuthRepository} from "../../domain/repository/auth.repository";

export class GetProfileUseCase implements GetProfileUseCaseInterface {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(getProfileInput: GetProfileInput): Promise<GetProfileOutput> {
    const { token } = getProfileInput;
    if(!token) {
        throw new Error('Token is required');
    }

    const userAuth = await this.authRepository.findUserByToken(token);
    return new GetProfileOutput(userAuth);
  }
}
