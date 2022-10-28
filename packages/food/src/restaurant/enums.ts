import { registerEnumType } from '@nestjs/graphql';

export enum PriceRange {
  Cheap = 'Cheap',
  Moderate = 'Moderate',
  Expensive = 'Expensive',
  Luxury = 'Luxury',
}

registerEnumType(PriceRange, { name: 'PriceRange' });
