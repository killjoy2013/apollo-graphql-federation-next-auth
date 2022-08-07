import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleRight1659894833920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "right" ("name", description) VALUES('countries', 'query countries');
        INSERT INTO "right" ("name", description) VALUES('cities', 'query cities');

        select sp_assign_right_to_role ('countries','ADMIN_ROLE');
        select sp_assign_right_to_role ('countries','USER_ROLE');
        select sp_assign_right_to_role ('cities','ADMIN_ROLE');
        select sp_assign_right_to_role ('cities','USER_ROLE');
        
        select sp_revoke_right_from_role ('removeCity','USER_ROLE');
        
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "right" WHERE "name" = 'countries';
        DELETE FROM "right" WHERE "name" = 'cities';
    `);
  }
}
