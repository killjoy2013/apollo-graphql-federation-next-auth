import { MigrationInterface, QueryRunner } from 'typeorm';

export class Africa1662450931558 implements MigrationInterface {
  name = 'Africa1662450931558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "country"."country_continent_enum" RENAME TO "country_continent_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "country"."country_continent_enum" AS ENUM('Asia', 'Europe', 'America', 'Africa')`,
    );
    await queryRunner.query(
      `ALTER TABLE "country"."country" ALTER COLUMN "continent" TYPE "country"."country_continent_enum" USING "continent"::"text"::"country"."country_continent_enum"`,
    );
    await queryRunner.query(`DROP TYPE "country"."country_continent_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "country"."country_continent_enum_old" AS ENUM('Asia', 'Europe', 'America')`,
    );
    await queryRunner.query(
      `ALTER TABLE "country"."country" ALTER COLUMN "continent" TYPE "country"."country_continent_enum_old" USING "continent"::"text"::"country"."country_continent_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "country"."country_continent_enum"`);
    await queryRunner.query(
      `ALTER TYPE "country"."country_continent_enum_old" RENAME TO "country_continent_enum"`,
    );
  }
}
