import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1664906148260 implements MigrationInterface {
  name = "Init1664906148260";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "people"."address" ("id" SERIAL NOT NULL, "detail" character varying NOT NULL, "city_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "people"."person" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "occupation" character varying NOT NULL, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "people"."hobby_difficulty_enum" AS ENUM('Easy', 'Moderate', 'Difficult')`
    );
    await queryRunner.query(
      `CREATE TABLE "people"."hobby" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "difficulty" "people"."hobby_difficulty_enum", CONSTRAINT "PK_9cf21d5206ec584a4cc14a8703e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "people"."person_hobby" ("person_id" integer NOT NULL, "hobby_id" integer NOT NULL, CONSTRAINT "PK_ec5e32dbacd6f2086204cc01413" PRIMARY KEY ("person_id", "hobby_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5d8d0a19076a524f72b7a359a" ON "people"."person_hobby" ("person_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9261f286aa1526de8c97bdd854" ON "people"."person_hobby" ("hobby_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "people"."address" ADD CONSTRAINT "FK_b370008f75f439dbba95cf6d5e8" FOREIGN KEY ("person_id") REFERENCES "people"."person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "people"."person_hobby" ADD CONSTRAINT "FK_f5d8d0a19076a524f72b7a359a5" FOREIGN KEY ("person_id") REFERENCES "people"."person"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "people"."person_hobby" ADD CONSTRAINT "FK_9261f286aa1526de8c97bdd854f" FOREIGN KEY ("hobby_id") REFERENCES "people"."hobby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`INSERT INTO people.hobby (id, "name", difficulty) 
    VALUES (1, 'Playing Guitar', 'Difficult'::people.hobby_difficulty_enum),
           (2, 'Swimming', 'Moderate'::people.hobby_difficulty_enum),
           (3, 'Travel', 'Easy'::people.hobby_difficulty_enum);

           SELECT setval('people.hobby_id_seq', 4)
           `);

    await queryRunner.query(`INSERT INTO people.person (id, "first_name", "last_name", occupation) 
        VALUES (1, 'Abraham', 'Lincoln', 'President'),
               (2, 'Anjelina', 'Jolie', 'Actress'),
               (3, 'Omar', 'Hayyam', 'Poet'),
               (4, 'Taylor', 'Swift', 'Singer');
               
               SELECT setval('people.person_id_seq', 5)
               `);

    await queryRunner.query(`INSERT INTO people.person_hobby (person_id, hobby_id) 
               VALUES (1, 1),
                      (2, 3),
                      (2, 2),
                      (3, 1),
                      (3, 2),
                      (3, 3),
                      (4, 2);`);

    await queryRunner.query(`INSERT INTO people.address (id, person_id, city_id, detail) 
                      VALUES (1, 1, 1, 'Adress lineeeee 11112'),
                             (2, 2, 2, 'detailed adresssssss'),
                             (3, 2, 3, 'Very detailed address'),
                             (4, 3, 3, 'Hayyam street'),
                             (5, 4, 4, 'Taylors addresss  111'),
                             (6, 4, 5, 'Taylors addresss  222');
                             
                             SELECT setval('people.address_id_seq', 7)
                             `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "people"."person_hobby" DROP CONSTRAINT "FK_9261f286aa1526de8c97bdd854f"`
    );
    await queryRunner.query(
      `ALTER TABLE "people"."person_hobby" DROP CONSTRAINT "FK_f5d8d0a19076a524f72b7a359a5"`
    );
    await queryRunner.query(
      `ALTER TABLE "people"."address" DROP CONSTRAINT "FK_b370008f75f439dbba95cf6d5e8"`
    );
    await queryRunner.query(
      `DROP INDEX "people"."IDX_9261f286aa1526de8c97bdd854"`
    );
    await queryRunner.query(
      `DROP INDEX "people"."IDX_f5d8d0a19076a524f72b7a359a"`
    );
    await queryRunner.query(`DROP TABLE "people"."person_hobby"`);
    await queryRunner.query(`DROP TABLE "people"."hobby"`);
    await queryRunner.query(`DROP TYPE "people"."hobby_difficulty_enum"`);
    await queryRunner.query(`DROP TABLE "people"."person"`);
    await queryRunner.query(`DROP TABLE "people"."address"`);
  }
}
