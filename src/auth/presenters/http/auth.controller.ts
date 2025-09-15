import {LoginUseCase} from "../../use-cases/login/login.use-case";
import {AuthCode} from "../../domain/value-object/auth-code.vo";
import {BadRequestException, Body, Controller, Get, Post, Headers, HttpCode} from "@nestjs/common";
import {LoginRequest} from "./dto/login-request.dto";
import {LoginResponse} from "./dto/login-response.dto";
import {GetProfileUseCase} from "../../use-cases/get-profile/get-profile.use-case";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly getProfileUseCase: GetProfileUseCase,
    ) {}

    @Get('me')
    //todo add auth guard
    async getProfile(@Headers('Authorization') bearer?: string) {
        try {
            const token = (bearer ?? '').split(' ')[1];
            const response = await this.getProfileUseCase.execute({ token });
            return {
                id: response.userAuth.id.getValue(),
                token: response.userAuth.token,
            }
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }


    @Post('login')
    @HttpCode(200)
    async login(@Body() requestDto: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await this.loginUseCase.execute({
                code: AuthCode.from(requestDto.code)
            })
            return new LoginResponse(
                response.userAuth.id.getValue(),
                response.userAuth.token!,
            );
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }
}
