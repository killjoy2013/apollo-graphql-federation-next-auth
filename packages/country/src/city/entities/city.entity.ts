import { Country } from '../../country/entities/country.entity';
import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'country' })
@ObjectType()
@Directive('@key(fields: "id")')
export class City {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  touristic: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  population: number;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'int', name: 'country_id' })
  countryId: number;
}
