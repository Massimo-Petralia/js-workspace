import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsIntoSupplierCategoriesTable1767726155215 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE supplier_categories
        ADD COLUMN marketplace_category VARCHAR,
        ADD COLUMN embedding VECTOR(512)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE supplier_categories
        DROP COLUMN marketplace_category,
        DROP COLUMN embedding
        `);
  }
}
