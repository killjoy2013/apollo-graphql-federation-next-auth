import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Person } from "src/person/entities/person.entity";

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Difficulty } from "../enums";

@Entity({ schema: "people" })
@ObjectType()
@Directive('@key(fields: "id")')
export class Hobby {
  @PrimaryGeneratedColumn("increment")
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({
    type: "enum",
    enum: Difficulty,
    nullable: true,
  })
  @Field(() => Difficulty, { nullable: true })
  difficulty: Difficulty;

  @ManyToMany(() => Person, (person) => person.hobbies)
  @Field(() => [Person], { nullable: true })
  persons: Person[];
}
