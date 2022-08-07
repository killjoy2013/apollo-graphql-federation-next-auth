import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1659521330935 implements MigrationInterface {
  name = 'Init1659521330935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "refresh_token" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "right" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_77e01b46d514d44ec33fd2d93d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role_right" ("role_id" integer NOT NULL, "right_id" integer NOT NULL, CONSTRAINT "PK_098880f8b44411d575b6c32e0c5" PRIMARY KEY ("role_id", "right_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a5086d797dda28a0449d64c89" ON "role_right" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2eacc9bb34d8d46a8f84438216" ON "role_right" ("right_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_right" ADD CONSTRAINT "FK_8a5086d797dda28a0449d64c89a" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_right" ADD CONSTRAINT "FK_2eacc9bb34d8d46a8f84438216b" FOREIGN KEY ("right_id") REFERENCES "right"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_right" DROP CONSTRAINT "FK_2eacc9bb34d8d46a8f84438216b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_right" DROP CONSTRAINT "FK_8a5086d797dda28a0449d64c89a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2eacc9bb34d8d46a8f84438216"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a5086d797dda28a0449d64c89"`,
    );
    await queryRunner.query(`DROP TABLE "role_right"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32a6fc2fcb019d8e3a8ace0f55"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0e5815877f7395a198a4cb0a4"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "right"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
