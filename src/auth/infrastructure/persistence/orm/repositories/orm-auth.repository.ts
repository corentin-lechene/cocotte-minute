import {Injectable} from "@nestjs/common";
import {AuthRepository} from "../../../../domain/repository/auth.repository";
import {UserAuth} from "src/auth/domain/models/auth.model";
import {AuthCode} from "src/auth/domain/value-object/auth-code.vo";
import {AuthOrmEntity} from "../entities/auth.entity";
import {AuthOrmMapper} from "../mappers/auth.mapper";
import {Knex} from "knex";

@Injectable()
export class OrmAuthRepository implements AuthRepository {
    private db: Knex;

    constructor() {
        this.db = require('knex')({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL,
                host: process.env['DB_HOST'],
                port: process.env['DB_PORT'],
                user: process.env['DB_USER'],
                database: process.env['DB_NAME'],
                password: process.env['DB_PASSWORD'],
                ssl: process.env['DB_SSL'] ? {rejectUnauthorized: false} : false,
            },
        });
    }

    async findUserByCode(code: AuthCode): Promise<UserAuth> {
        const user = await this.db<AuthOrmEntity>('auth').where({
            code: code.getValue()
        }).first();
        if (!user) {
            throw new Error('User not found');
        }
        return AuthOrmMapper.toDomain(user);
    }

    async findUserByToken(token: string): Promise<UserAuth> {
        const user = await this.db<AuthOrmEntity>('auth').where({
            token: token
        }).first();
        if (!user) {
            throw new Error('User not found');
        }
        return AuthOrmMapper.toDomain(user);
    }

    async saveUser(user: UserAuth): Promise<UserAuth> {
        try {
            const updatedRows = await this.db<AuthOrmEntity>('auth').where({
                id: user.id.getValue()
            }).update(AuthOrmMapper.toPersistence(user)).returning('*');
            if (updatedRows.length === 0) {
                throw new Error('User not found');
            }
            return AuthOrmMapper.toDomain(updatedRows[0]);
        } catch (error) {
            throw new Error('Error saving user');
        }
    }
}