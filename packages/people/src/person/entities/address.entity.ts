import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./city.proxy.entity";
import { Person } from "./person.entity";

@Entity({ schema: "people" })
@ObjectType()
@Directive('@key(fields: "id")')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  detail: string;

  @Column({ name: "city_id" })
  //@Field((type) => Int)
  cityId: number;

  @Column({ type: "int", name: "person_id" })
  @Field((type) => Int)
  personId: number;

  @ManyToOne(() => Person, (person) => person.addresses)
  @JoinColumn({ name: "person_id" })
  person: Person;
}
