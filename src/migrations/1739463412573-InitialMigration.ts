import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1739463412573 implements MigrationInterface {
  name = 'InitialMigration1739463412573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "word" 
      ALTER COLUMN "addedBy" TYPE integer USING "addedBy"::integer
    `);

    await queryRunner.query(`
      ALTER TABLE "word"
      ADD CONSTRAINT "FK_word_user"
      FOREIGN KEY ("addedBy") 
      REFERENCES "user"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "word"
      RENAME COLUMN "addedBy" TO "userId"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "word"
      DROP CONSTRAINT "FK_word_user"
    `);

    await queryRunner.query(`
      ALTER TABLE "word"
      RENAME COLUMN "userId" TO "addedBy"
    `);

    await queryRunner.query(`
      ALTER TABLE "word"
      ALTER COLUMN "addedBy" TYPE text
    `);
  }
}
