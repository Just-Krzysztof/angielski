import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1739462697607 implements MigrationInterface {
  name = 'AddRoleToUser1739462697607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Sprawdź czy kolumna role istnieje
    const hasRoleColumn = await queryRunner.hasColumn('user', 'role');
    if (!hasRoleColumn) {
      await queryRunner.query(`
        ALTER TABLE "user" 
        ADD COLUMN IF NOT EXISTS "role" character varying DEFAULT NULL
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Usuń kolumnę tylko jeśli istnieje
    const hasRoleColumn = await queryRunner.hasColumn('user', 'role');
    if (hasRoleColumn) {
      await queryRunner.query(`
        ALTER TABLE "user" 
        DROP COLUMN "role"
      `);
    }
  }
}
