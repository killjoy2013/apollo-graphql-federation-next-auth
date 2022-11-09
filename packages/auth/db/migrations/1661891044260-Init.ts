import { MigrationInterface, QueryRunner } from 'typeorm';

export class newMigration1661891044260 implements MigrationInterface {
  name = 'newMigration1661891044260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth"."user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "refresh_token" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."right" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_77e01b46d514d44ec33fd2d93d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "auth"."user_role" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "auth"."user_role" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "auth"."role_right" ("role_id" integer NOT NULL, "right_id" integer NOT NULL, CONSTRAINT "PK_098880f8b44411d575b6c32e0c5" PRIMARY KEY ("role_id", "right_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a5086d797dda28a0449d64c89" ON "auth"."role_right" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2eacc9bb34d8d46a8f84438216" ON "auth"."role_right" ("right_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "auth"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."role_right" ADD CONSTRAINT "FK_8a5086d797dda28a0449d64c89a" FOREIGN KEY ("role_id") REFERENCES "auth"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."role_right" ADD CONSTRAINT "FK_2eacc9bb34d8d46a8f84438216b" FOREIGN KEY ("right_id") REFERENCES "auth"."right"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth"."role_right" DROP CONSTRAINT "FK_2eacc9bb34d8d46a8f84438216b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."role_right" DROP CONSTRAINT "FK_8a5086d797dda28a0449d64c89a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth"."user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_2eacc9bb34d8d46a8f84438216"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_8a5086d797dda28a0449d64c89"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."role_right"`);
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_32a6fc2fcb019d8e3a8ace0f55"`,
    );
    await queryRunner.query(
      `DROP INDEX "auth"."IDX_d0e5815877f7395a198a4cb0a4"`,
    );
    await queryRunner.query(`DROP TABLE "auth"."user_role"`);
    await queryRunner.query(`DROP TABLE "auth"."right"`);
    await queryRunner.query(`DROP TABLE "auth"."role"`);
    await queryRunner.query(`DROP TABLE "auth"."user"`);
  }
}
