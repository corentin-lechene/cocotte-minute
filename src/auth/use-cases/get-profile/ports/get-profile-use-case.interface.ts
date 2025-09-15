import { GetProfileInput } from "./get-profile-dto.input";
import { GetProfileOutput } from "./get-profile-dto.output";

export abstract class GetProfileUseCaseInterface {
  abstract execute(getProfileInput: GetProfileInput): Promise<GetProfileOutput>;
}
