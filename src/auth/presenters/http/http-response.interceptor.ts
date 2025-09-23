import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HTTPException, HTTPUnknownException} from "./http.exception";

interface HTTPResponse<T> {
    success: boolean;
    data?: T | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<HTTPResponse<T> | HTTPException> {
        return next.handle().pipe(
            map(data => ({
                success: true,
                data: data as T,
            })),
            catchError((error: Error) => {
                if (error instanceof HTTPException) {
                    return throwError(() => error);
                }
                return throwError(() => new HTTPUnknownException(error));
            })
        );
    }
}