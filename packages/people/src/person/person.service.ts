import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreatePersonInput } from "./dto/create-person.input";
import { Address } from "./entities/address.entity";

import { Person } from "./entities/person.entity";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(Person) private addressRepo: Repository<Address>
  ) {}

  async create(input: CreatePersonInput): Promise<Person> {
    // console.log("create person", { input });

    // let createdPerson = await this.personRepo.save(input);

    // console.log({ createdPerson });

    let newPerson = await Person.create({
      firstName: input.firstName,
      lastName: input.lastName,
      occupation: input.occupation,
    }).save();

    let newAddress = await Address.create({
      personId: newPerson.id,
      cityId: input.address.cityId,
      detail: input.address.detail,
    }).save();

    // let newAddress = await this.addressRepo.save({
    //   personId: 1,
    //   cityId: input.address.cityId,
    //   detail: input.address.detail,
    // });

    let result = await this.personRepo.findOne({
      where: {
        id: newPerson.id,
      },
    });
    return result;
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
    return await this.personRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findAddressById(id: number): Promise<Address> {
    return await this.addressRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findByCityId(cityId: number): Promise<Person[]> {
    let baseQueryBuilder = await this.personRepo.createQueryBuilder("person");

    baseQueryBuilder.innerJoin(
      "address",
      "address",
      "address.personId = person.id"
    );

    baseQueryBuilder.where("address.cityId = :cityId", {
      cityId,
    });

    let dell = await baseQueryBuilder.getMany();

    return dell;
  }

  async remove(id: number) {
    let found = await this.personRepo.findOne({
      where: {
        id,
      },
    });
    if (found) {
      await this.personRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}
