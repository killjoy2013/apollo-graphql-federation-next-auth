import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreatePersonInput } from "./dto/create-person.input";

import { Person } from "./entities/person.entity";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>
  ) {}

  async create(input: CreatePersonInput): Promise<Person> {
    return await this.personRepo.save(input);
  }

  async findAll(name: string = null): Promise<Person[]> {
    if (name !== null) {
      return await this.personRepo.find({
        where: {
          firstName: Like(`%${name}%`),
        },
        relations: ["addresses", "hobbies"],
      });
    } else {
      return await this.personRepo.find({
        relations: ["addresses", "hobbies"],
      });
    }
  }

  async findOne(id: number): Promise<Person> {
    return await this.personRepo.findOne(id);
  }

  async remove(id: number) {
    let found = await this.personRepo.findOne(id);
    if (found) {
      await this.personRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
