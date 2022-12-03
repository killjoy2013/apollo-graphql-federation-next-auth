import { registerEnumType } from '@nestjs/graphql';

export enum Difficulty {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Difficult = 'Difficult',
}

registerEnumType(Difficulty, { name: 'Difficulty' });
