import {HTTPException, HTTPUnknownException} from "./http.exception";
import {UseCaseError} from "../../../recipe/use-cases/use-case.error";

export class HTTPExceptionMapper extends Error {
    static toHttpException(error: UseCaseError): HTTPException {
        switch (error.code) {
            default:
                return new HTTPUnknownException(error);
        }
    }
}