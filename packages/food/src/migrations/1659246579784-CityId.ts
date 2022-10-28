import { MigrationInterface, QueryRunner } from 'typeorm';

export class CityId1659246579784 implements MigrationInterface {
  name = 'CityId1659246579784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant" ADD "cityId" integer NOT NULL`,
    );

    await queryRunner.query(`
        INSERT INTO "food".restaurant (id, "name", "cityId")
        VALUES (1, 'Hunger', 5),
               (2, 'La Maison', 2),
               (3, 'Rouge', 2),
               (4, 'Croissant', 2),
               (5, 'Noma', 5),
               (6, 'Best Teppenyaki', 3);

               SELECT setval('food.restaurant_id_seq', 7) 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant" DROP COLUMN "cityId"`,
    );

    await queryRunner.query(`DELETE FROM "food".restaurant;`);
  }
}
