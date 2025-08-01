import {UseCaseError} from "../../use-cases/use-case.error";
import {HTTPException, HTTPUnknownException} from "./http.exception";

export class HTTPExceptionMapper extends Error {
    static toHttpException(error: UseCaseError): HTTPException {
        switch (error.code) {
            case 'RECIPE_NOT_FOUND':
                return new HTTPException({
                    statusCode: 404,
                    errorCode: 'RECIPE_NOT_FOUND',
                    message: 'Recipe not found',
                })
            default:
                return new HTTPUnknownException(error);
        }
    }
}