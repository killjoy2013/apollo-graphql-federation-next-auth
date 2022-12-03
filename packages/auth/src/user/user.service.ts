import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from './entitites/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    return await this.userRepo.create(createUserInput);
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async findAll(userName: string = null): Promise<User[]> {
    if (userName !== null) {
      return await this.userRepo.find({
        where: {
          userName: Like(`%${userName}%`),
        },
        relations: ['roles'],
      });
    } else {
      return await this.userRepo.find({
        relations: ['roles'],
      });
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    const found = await this.userRepo.findOne({
      where: {
        id: updateUserInput.id,
      },
    });
    return await this.userRepo.save({ ...found, ...updateUserInput });
  }

  async remove(id: number) {
    const found = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (found) {
      await this.userRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
