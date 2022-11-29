import { RoleService } from './role.service';
import { RightService } from './right.service';
import { CreateRightInput } from './dto/create-right.input';
import { UpdateRightInput } from './dto/update-right.input';
import { Right } from './entities/right.entity';
export declare class RightResolver {
    private readonly roleService;
    private readonly rightService;
    constructor(roleService: RoleService, rightService: RightService);
    create(createRightInput: CreateRightInput): Promise<Right>;
    findOne(id: number): Promise<Right>;
    findAll(name: string): Promise<Right[]>;
    update(updateRightInput: UpdateRightInput): Promise<{
        id: number;
        name: string;
        description: string;
        roles: import("./entities/role.entity").Role[];
    } & Right>;
    remove(id: number): Promise<number>;
    assignRightToRole(rightName: string, roleName: string): Promise<string>;
    revokeRightFromRole(rightName: string, roleName: string): Promise<string>;
    roles(right: any): Promise<import("./entities/role.entity").Role[]>;
}
