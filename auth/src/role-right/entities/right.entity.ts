import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ schema: 'auth' })
@ObjectType()
export class Right extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @ManyToMany(() => Role, (role) => role.rights)
  @Field(() => [Role], { nullable: true })
  roles: Role[];
}
