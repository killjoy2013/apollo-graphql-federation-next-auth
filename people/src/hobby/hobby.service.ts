import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHobbyInput } from "./dto/create-hobby.input";
import { Hobby } from "./entities/hobby.entity";

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private hobbyRepo: Repository<Hobby>
  ) {}

  async create(input: CreateHobbyInput): Promise<Hobby> {
    return await this.hobbyRepo.save(input);
  }

  async findAll(name: string = null): Promise<Hobby[]> {
    if (name !== null) {
      return await this.hobbyRepo
        .createQueryBuilder("hobby")
        .where("hobby.name like :name", { name: `%${name}%` })
        .getMany();
    } else {
      return await this.hobbyRepo.find();
    }
  }

  async findOne(id: number): Promise<Hobby> {
    return await this.hobbyRepo.findOne(id);
  }

  async remove(id: number) {
    let found = await this.hobbyRepo.findOne(id);
    if (found) {
      await this.hobbyRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
