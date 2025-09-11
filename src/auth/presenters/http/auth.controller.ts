import {LoginUseCase} from "../../use-cases/login/login.use-case";
import {AuthCode} from "../../domain/value-object/auth-code.vo";
import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
import {LoginRequest} from "./dto/login-request.dto";
import {LoginResponse} from "./dto/login-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) {}

    @Post('login')
    async addStepComposite(@Body() requestDto: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.loginUseCase.execute({
                code: AuthCode.from(requestDto.code)
            })
            return new LoginResponse(response.userAuth.id.getValue());
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }
}
