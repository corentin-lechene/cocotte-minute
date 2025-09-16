import {LoginUseCase} from "../../use-cases/login/login.use-case";
import {AuthCode} from "../../domain/value-object/auth-code.vo";
import {BadRequestException, Body, Controller, Get, Post, HttpCode, UseGuards} from "@nestjs/common";
import {LoginRequest} from "./dto/login-request.dto";
import {LoginResponse} from "./dto/login-response.dto";
import {GetProfileUseCase} from "../../use-cases/get-profile/get-profile.use-case";
import {ExecutionContextUserDecorator} from "../../infrastructure/nest/decorators/execution-context-user.decorator";
import {ExecutionContextUser} from "../../../common/interfaces/execution-context-user.interface";
import {ExecutionContextUserGuard} from "../../infrastructure/nest/guards/execution-context-user.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly getProfileUseCase: GetProfileUseCase,
    ) {}

    @Get('me')
    @UseGuards(ExecutionContextUserGuard)
    async getProfile(@ExecutionContextUserDecorator() executionContextUser: ExecutionContextUser): Promise<any> {
        try {
            const response = await this.getProfileUseCase.execute({ token: executionContextUser.actor.token });
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
