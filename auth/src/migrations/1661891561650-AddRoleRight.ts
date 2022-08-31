import { MigrationInterface, QueryRunner } from 'typeorm';

export class newMigration1661891561650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO auth."right" ("name", description) VALUES('countries', 'query countries');
            INSERT INTO auth."right" ("name", description) VALUES('cities', 'query cities');
    
            select auth.sp_assign_right_to_role ('countries','ADMIN_ROLE');
            select auth.sp_assign_right_to_role ('countries','USER_ROLE');
            select auth.sp_assign_right_to_role ('cities','ADMIN_ROLE');
            select auth.sp_assign_right_to_role ('cities','USER_ROLE');
            
            select auth.sp_revoke_right_from_role ('removeCity','USER_ROLE');
            
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM auth."right" WHERE "name" = 'countries';
            DELETE FROM auth."right" WHERE "name" = 'cities';
        `);
  }
}
