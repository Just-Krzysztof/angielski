import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1739464690254 implements MigrationInterface {
    name = 'InitialMigration1739464690254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "en" text array NOT NULL, "pl" text array NOT NULL, "userId" integer NOT NULL, "dateAdded" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "word" ADD CONSTRAINT "FK_4d9fb2abff81f0e34ae02be3178" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word" DROP CONSTRAINT "FK_4d9fb2abff81f0e34ae02be3178"`);
        await queryRunner.query(`DROP TABLE "word"`);
    }

}
