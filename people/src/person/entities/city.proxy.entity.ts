import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "./address.entity";
import { Person } from "./person.entity";

@ObjectType()
@Directive("@extends")
@Directive('@key(fields: "id")')
export class City {
  @Field((type) => Int)
  @Directive("@external")
  id: number;

  @Field((type) => [Person], { nullable: true })
  persons: Person[];
}
