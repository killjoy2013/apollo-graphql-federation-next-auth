import { Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Right } from './entities/right.entity';
import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';
export declare class RoleService {
    private roleRepo;
    private readonly dataSource;
    constructor(roleRepo: Repository<Role>, dataSource: DataSource);
    create(createRoleInput: CreateRoleInput): Promise<Role>;
    findOne(id: number): Promise<Role>;
    findAll(name?: string): Promise<Role[]>;
    findRolesByRight(rightId: number): Promise<Role[]>;
    update(updateRoleInput: UpdateRoleInput): Promise<{
        id: number;
        name: string;
        description: string;
        rights: Right[];
        users: User[];
    } & Role>;
    remove(id: number): Promise<number>;
    assignRoleToUser(roleName: string, username: string): Promise<string>;
    revokeRoleFromUser(roleName: string, username: string): Promise<string>;
    revokeAllRolesFromUser(username: string): Promise<string>;
}
