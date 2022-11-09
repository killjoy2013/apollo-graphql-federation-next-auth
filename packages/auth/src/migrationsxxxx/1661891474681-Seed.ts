import { MigrationInterface, QueryRunner } from 'typeorm';

export class newMigration1661891474681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO auth."role" (name, description) VALUES('ADMIN_ROLE', NULL);
            INSERT INTO auth."role" (name, description) VALUES('USER_ROLE', NULL);
    
            INSERT INTO auth."right" ("name", description) VALUES('removeCity', NULL);
            INSERT INTO auth."right" ("name", description) VALUES('removeCountry', NULL);
    
            INSERT INTO auth."user" (user_name, first_name, last_name) VALUES('admin', 'Anjelina', 'Jolie');
            INSERT INTO auth."user" (user_name, first_name, last_name) VALUES('customer', 'Brad', 'Bitt');
    
            select auth.sp_assign_right_to_role ('removeCity','ADMIN_ROLE');
            select auth.sp_assign_right_to_role ('removeCountry','ADMIN_ROLE');
            select auth.sp_assign_right_to_role ('removeCity','USER_ROLE');
    
            select auth.sp_assign_role_to_user ('ADMIN_ROLE', 'admin');
            select auth.sp_assign_role_to_user ('USER_ROLE', 'customer');
    
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
