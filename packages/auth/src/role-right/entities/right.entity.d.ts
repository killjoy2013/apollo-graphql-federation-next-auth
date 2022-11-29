import { BaseEntity } from 'typeorm';
import { Role } from './role.entity';
export declare class Right extends BaseEntity {
    id: number;
    name: string;
    description: string;
    roles: Role[];
}
