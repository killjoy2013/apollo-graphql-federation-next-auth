import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Hobby } from 'src/hobby/entities/hobby.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity({ schema: 'people' })
@ObjectType()
@Directive('@key(fields: "id")')
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column()
  @Field()
  occupation: string;

  @OneToMany(() => Address, (address) => address.person)
  @Field(() => [Address], { nullable: true })
  addresses: Address[];

  @ManyToMany(() => Hobby, (hobby) => hobby.persons)
  @Field(() => [Hobby], { nullable: true })
  @JoinTable({
    name: 'person_hobby',
    joinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hobby_id',
      referencedColumnName: 'id',
    },
  })
  hobbies: Hobby[];
}
