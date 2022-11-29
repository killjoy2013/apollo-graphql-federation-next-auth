import { BaseEntity } from 'typeorm';
import { Role } from '../../role-right/entities/role.entity';
export declare class User extends BaseEntity {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    refreshToken: string;
    roles: Role[];
}
