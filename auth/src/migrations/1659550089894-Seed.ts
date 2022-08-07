import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1659550089894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "role" (name, description) VALUES('ADMIN_ROLE', NULL);
        INSERT INTO "role" (name, description) VALUES('USER_ROLE', NULL);

        INSERT INTO "right" ("name", description) VALUES('removeCity', NULL);
        INSERT INTO "right" ("name", description) VALUES('removeCountry', NULL);

        INSERT INTO "user" (user_name, first_name, last_name) VALUES('admin', 'Anjelina', 'Jolie');
        INSERT INTO "user" (user_name, first_name, last_name) VALUES('customer', 'Brad', 'Bitt');

        select sp_assign_right_to_role ('removeCity','ADMIN_ROLE');
        select sp_assign_right_to_role ('removeCountry','ADMIN_ROLE');
        select sp_assign_right_to_role ('removeCity','USER_ROLE');

        select sp_assign_role_to_user ('ADMIN_ROLE', 'admin');
        select sp_assign_role_to_user ('USER_ROLE', 'customer');

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
