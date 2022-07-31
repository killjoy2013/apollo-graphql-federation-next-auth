import { MigrationInterface, QueryRunner } from 'typeorm';

export class PriceRange1659256623206 implements MigrationInterface {
  name = 'PriceRange1659256623206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."restaurant_price_range_enum" AS ENUM('Cheap', 'Moderate', 'Expensive', 'Luxury')`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD "price_range" "public"."restaurant_price_range_enum"`,
    );

    await queryRunner.query(
      `UPDATE "restaurant" SET "price_range"='Moderate'::restaurant_price_range_enum `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP COLUMN "price_range"`,
    );
    await queryRunner.query(`DROP TYPE "public"."restaurant_price_range_enum"`);
  }
}
