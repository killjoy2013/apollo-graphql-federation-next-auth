import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role-right/entities/role.entity';

@Entity({ schema: 'auth' })
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column({ name: 'user_name' })
  @Field()
  userName: string;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true })
  @Field()
  refreshToken: string;

  @ManyToMany(() => Role, (role) => role.users)
  @Field(() => [Role], { nullable: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
