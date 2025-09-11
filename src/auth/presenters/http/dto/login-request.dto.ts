import {IsString} from 'class-validator';

export class LoginRequest {
    @IsString()
    code: string;

    constructor(code: string) {
        this.code = code;
    }
}