import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateRightInput } from './dto/create-right.input';
import { UpdateRightInput } from './dto/update-right.input';
import { Right } from './entities/right.entity';

@Injectable()
export class RightService {
  constructor(
    @InjectRepository(Right) private rightRepo: Repository<Right>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRightInput: CreateRightInput) {
    return await this.rightRepo.create(createRightInput).save();
  }

  async findOne(id: number) {
    return await this.rightRepo.findOneBy({ id });
  }

  async findAll(name: string = null): Promise<Right[]> {
    if (name !== null) {
      return await this.rightRepo.find({
        where: {
          name: Like(`%${name}%`),
        },
        relations: ['roles'],
      });
    } else {
      return await this.rightRepo.find({
        relations: ['roles'],
      });
    }
  }

  async findByRole(roleId: number) {
    let baseQueryBuilder = this.rightRepo.createQueryBuilder('right');

    baseQueryBuilder.innerJoin(
      'role_right',
      'role_right',
      'role_right.right_id = right.id',
    );

    baseQueryBuilder.where('role_right.role_id = :roleId', {
      roleId,
    });

    let dell = await baseQueryBuilder.getMany();

    return dell;
  }

  async update(updateRightInput: UpdateRightInput) {
    let found = await this.rightRepo.findOneBy({ id: updateRightInput.id });
    return await this.rightRepo.save({ ...found, ...updateRightInput });
  }

  async remove(id: number) {
    let found = await this.rightRepo.findOneBy({ id });
    if (found) {
      await this.rightRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }

  async assignRightToRole(rightName: string, roleName: string) {
    await this.dataSource.query(`select sp_assign_right_to_role ($1,$2);`, [
      rightName,
      roleName,
    ]);

    return 'OK';
  }
  async revokeRightFromRole(rightName: string, roleName: string) {
    await this.dataSource.query(`select sp_revoke_right_from_role ($1,$2);`, [
      rightName,
      roleName,
    ]);

    return 'OK';
  }
}
