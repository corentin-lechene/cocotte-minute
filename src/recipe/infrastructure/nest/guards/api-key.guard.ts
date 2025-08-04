import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly apiKey = process.env.API_KEY;

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const headerKey = request.headers['x-api-key'];

        if (headerKey && headerKey === this.apiKey) {
            return true;
        }

        throw new UnauthorizedException('Invalid or missing API Key');
    }
}