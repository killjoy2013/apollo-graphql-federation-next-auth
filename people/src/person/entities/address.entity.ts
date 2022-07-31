import { Field, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Person } from "./person.entity";

@Entity()
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  detail: string;

  @Column({ name: "city_id" })
  @Field((type) => Int)
  cityId: number;

  @Column({ type: "int", name: "person_id" })
  @Field((type) => Int)
  personId: number;

  @ManyToOne(() => Person, (person) => person.addresses)
  @JoinColumn({ name: "person_id" })
  person: Person;
}
