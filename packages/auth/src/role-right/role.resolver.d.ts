import { RoleService } from './role.service';
import { RightService } from './right.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
export declare class RoleResolver {
    private readonly roleService;
    private readonly rightService;
    constructor(roleService: RoleService, rightService: RightService);
    create(createRoleInput: CreateRoleInput): Promise<Role>;
    findOne(id: number): Promise<Role>;
    findAll(name: string): Promise<Role[]>;
    update(updateRoleInput: UpdateRoleInput): Promise<{
        id: number;
        name: string;
        description: string;
        rights: import("./entities/right.entity").Right[];
        users: User[];
    } & Role>;
    remove(id: number): Promise<number>;
    assignRoleToUser(roleName: string, username: string): Promise<void>;
    revokeRoleFromUser(roleName: string, username: string): Promise<void>;
    revokeAllRolesFromUser(username: string): Promise<void>;
    rights(role: any): Promise<import("./entities/right.entity").Right[]>;
}
