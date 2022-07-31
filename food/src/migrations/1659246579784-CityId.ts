import {MigrationInterface, QueryRunner} from "typeorm";

export class CityId1659246579784 implements MigrationInterface {
    name = 'CityId1659246579784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "cityId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "cityId"`);
    }

}
