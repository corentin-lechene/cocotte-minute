import {Injectable} from "@nestjs/common";
import {AuthRepository} from "../../../../domain/repository/auth.repository";
import {UserAuth} from "../../../../domain/models/auth.model";
import { AuthCode } from "src/auth/domain/value-object/auth-code.vo";
import {AuthEntity} from "../entities/auth.entity";
import {AuthMapper} from "../mappers/auth.mapper";

@Injectable()
export class InMemoryAuthRepository implements AuthRepository {

    private readonly users: AuthEntity[] = [
        { id: '1', code: '123456', expiredAt: undefined, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidmFsdWUiOiIxIn0sImlhdCI6MTc1NzkzMTc0NiwiZXhwIjoxNzg5NDg5MzQ2fQ.BnchsYEkSD1JlGbiF90zJxH6e9SBE14IljA1wfsufIk'},
        { id: '2', code: '222222', expiredAt: new Date('2024-12-31'), token: undefined},
    ];

    findUserByCode(code: AuthCode): Promise<UserAuth> {
        const user = this.users.find(user => user.code === code.getValue());
        if(!user) {
            return Promise.reject(new Error('User not found'));
        }
        return Promise.resolve(AuthMapper.toDomain(user));
    }

    findUserByToken(token: string): Promise<UserAuth> {
        const user = this.users.find(user => user.token === token);
        if(!user) {
            return Promise.reject(new Error('User not found'));
        }
        return Promise.resolve(AuthMapper.toDomain(user));
    }

    saveUser(user: UserAuth): Promise<UserAuth> {
        const index = this.users.findIndex(u => u.id === user.id.getValue());
        if(index === -1) {
            return Promise.reject(new Error('User not found'));
        }
        this.users[index] = AuthMapper.toPersistence(user);
        return Promise.resolve(AuthMapper.toDomain(this.users[index]));
    }
}