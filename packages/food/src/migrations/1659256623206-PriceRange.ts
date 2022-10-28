import { MigrationInterface, QueryRunner } from 'typeorm';

export class PriceRange1659256623206 implements MigrationInterface {
  name = 'PriceRange1659256623206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "food"."restaurant_price_range_enum" AS ENUM('Cheap', 'Moderate', 'Expensive', 'Luxury')`,
    );
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant" ADD "price_range" "food"."restaurant_price_range_enum"`,
    );

    await queryRunner.query(
      `UPDATE "food"."restaurant" SET "price_range"='Luxury'::food.restaurant_price_range_enum WHERE name='Noma';
       UPDATE "food"."restaurant" SET "price_range"='Expensive'::food.restaurant_price_range_enum WHERE name IN ('La Maison', 'Rouge');
       UPDATE "food"."restaurant" SET "price_range"='Cheap'::food.restaurant_price_range_enum WHERE name IN ('Croissant', 'Hunger');
       UPDATE "food"."restaurant" SET "price_range"='Moderate'::food.restaurant_price_range_enum WHERE name NOT IN ('Croissant', 'Hunger','La Maison', 'Rouge','Noma');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant" DROP COLUMN "price_range"`,
    );
    await queryRunner.query(`DROP TYPE "food"."restaurant_price_range_enum"`);
  }
}
