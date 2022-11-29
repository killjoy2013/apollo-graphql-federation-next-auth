import { User } from 'src/user/entitites/user.entity';
import { BaseEntity } from 'typeorm';
import { Right } from './right.entity';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    description: string;
    rights: Right[];
    users: User[];
}
