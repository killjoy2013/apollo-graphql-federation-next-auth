import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Right } from './entities/right.entity';
import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    return await this.roleRepo.create(createRoleInput).save();
  }

  async findOne(id: number) {
    return await this.roleRepo.findOneBy({ id });
  }

  async findAll(name: string = null): Promise<Role[]> {
    if (name !== null) {
      return await this.roleRepo.find({
        where: {
          name: Like(`%${name}%`),
        },
        relations: ['rights'],
      });
    } else {
      return await this.roleRepo.find({
        relations: ['rights'],
      });
    }
  }

  async findRolesByRight(rightId: number) {
    const baseQueryBuilder = this.roleRepo.createQueryBuilder('role');

    baseQueryBuilder.innerJoin(
      'role_right',
      'role_right',
      'role_right.role_id = role.id',
    );

    baseQueryBuilder.where('role_right.right_id = :rightId', {
      rightId,
    });

    return await baseQueryBuilder.getMany();
  }

  async update(updateRoleInput: UpdateRoleInput) {
    const found = await this.roleRepo.findOne({
      where: {
        id: updateRoleInput.id,
      },
    });
    return await this.roleRepo.save({ ...found, ...updateRoleInput });
  }

  async remove(id: number) {
    const found = await this.roleRepo.findOne({
      where: {
        id,
      },
    });
    if (found) {
      await this.roleRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }

  async assignRoleToUser(roleName: string, username: string) {
    await this.dataSource.query(
      `select auth.sp_assign_role_to_user(${roleName}, ${username});`,
    );

    return 'OK';
  }

  async revokeRoleFromUser(roleName: string, username: string) {
    await this.dataSource.query(`select sp_revoke_role_from_user($1, $2);`, [
      roleName,
      username,
    ]);
    return 'OK';
  }

  async revokeAllRolesFromUser(username: string) {
    await this.dataSource.query(`select sp_revoke_all_roles_from_user($1);`, [
      username,
    ]);
    return 'OK';
  }
}
