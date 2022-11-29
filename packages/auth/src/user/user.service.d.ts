import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entitites/user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserInput: CreateUserInput): Promise<User>;
    findOne(id: number): Promise<User>;
    findAll(userName?: string): Promise<User[]>;
    update(updateUserInput: UpdateUserInput): Promise<{
        id: number;
        userName: string;
        firstName: string;
        lastName: string;
        refreshToken: string;
        roles: import("../role-right/entities/role.entity").Role[];
    } & User>;
    remove(id: number): Promise<number>;
}
