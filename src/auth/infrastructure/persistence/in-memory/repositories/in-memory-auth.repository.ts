import {Injectable} from "@nestjs/common";
import {AuthRepository} from "../../../../domain/repository/auth.repository";
import {UserAuth} from "../../../../domain/models/auth.model";
import { AuthCode } from "src/auth/domain/value-object/auth-code.vo";
import {AuthEntity} from "../entities/auth.entity";
import {AuthMapper} from "../mappers/auth.mapper";

@Injectable()
export class InMemoryAuthRepository implements AuthRepository {

    private readonly users: AuthEntity[] = [
        { id: '1', code: '123456', expiredAt: undefined},
        { id: '2', code: '222222', expiredAt: new Date('2024-12-31')},
    ];

    findUserByCode(code: AuthCode): Promise<UserAuth> {
        const user = this.users.find(user => user.code === code.getValue());
        if(!user) {
            return Promise.reject(new Error('User not found'));
        }
        return Promise.resolve(AuthMapper.toDomain(user));
    }
    setUserCodeToExpired(userAuth: UserAuth): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === userAuth.id.getValue());
        if(userIndex === -1) {
            return Promise.reject(new Error('User not found'));
        }
        this.users[userIndex].expiredAt = new Date();
        return Promise.resolve();
    }
}