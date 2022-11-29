import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class newMigration1661891044260 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
