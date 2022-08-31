import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entitites/user.entity';

import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Right } from './right.entity';

@Entity({ schema: 'auth' })
@ObjectType()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @ManyToMany(() => Right, (right) => right.roles)
  @Field(() => [Right], { nullable: true })
  @JoinTable({
    name: 'role_right',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'right_id',
      referencedColumnName: 'id',
    },
  })
  rights: Right[];

  @ManyToMany(() => User, (user) => user.roles)
  @Field(() => [User], { nullable: true })
  users: User[];
}
