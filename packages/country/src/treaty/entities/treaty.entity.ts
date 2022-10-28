import { Country } from '../../country/entities/country.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'country' })
@ObjectType()
export class Treaty {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Country, (country) => country.treaties)
  @Field(() => [Country], { nullable: true })
  countries: Country[];
}
