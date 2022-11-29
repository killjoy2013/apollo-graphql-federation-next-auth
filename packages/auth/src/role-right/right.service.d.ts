import { DataSource, Repository } from 'typeorm';
import { CreateRightInput } from './dto/create-right.input';
import { UpdateRightInput } from './dto/update-right.input';
import { Right } from './entities/right.entity';
export declare class RightService {
    private rightRepo;
    private readonly dataSource;
    constructor(rightRepo: Repository<Right>, dataSource: DataSource);
    create(createRightInput: CreateRightInput): Promise<Right>;
    findOne(id: number): Promise<Right>;
    findAll(name?: string): Promise<Right[]>;
    findByRole(roleId: number): Promise<Right[]>;
    update(updateRightInput: UpdateRightInput): Promise<{
        id: number;
        name: string;
        description: string;
        roles: import("./entities/role.entity").Role[];
    } & Right>;
    remove(id: number): Promise<number>;
    assignRightToRole(rightName: string, roleName: string): Promise<string>;
    revokeRightFromRole(rightName: string, roleName: string): Promise<string>;
}
