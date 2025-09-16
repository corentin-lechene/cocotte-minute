import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {ExecutionContextUser} from "../../../../common/interfaces/execution-context-user.interface";

export const ExecutionContextUserDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ExecutionContextUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.executionContextUser as ExecutionContextUser;
    },
);