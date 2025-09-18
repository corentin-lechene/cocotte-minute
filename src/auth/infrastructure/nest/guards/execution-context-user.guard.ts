import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {AuthRepository} from "../../../domain/repository/auth.repository";
import {Actor, ExecutionContextUser} from "../../../../common/interfaces/execution-context-user.interface";

//todo: move this to shared module
@Injectable()
export class ExecutionContextUserGuard implements CanActivate {
    constructor(private readonly authRepository: AuthRepository) {} //todo: remove this

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request & { executionContextUser?: ExecutionContextUser } = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        const token = authHeader.replace('Bearer ', '').trim();
        console.log(token);
        const user = await this.authRepository.findUserByToken(token);

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        const actor = new Actor(user.id.getValue(), token, 'user.firstName', 'user.lastName');
        request.executionContextUser = new ExecutionContextUser(actor);

        return true;
    }
}