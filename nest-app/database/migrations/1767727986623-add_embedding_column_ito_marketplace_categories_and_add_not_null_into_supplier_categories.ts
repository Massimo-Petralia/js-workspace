import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmbeddingColumnItoMarketplaceCategoriesAndAddNotNullIntoSupplierCategories1767727986623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE marketplace_categories
        ADD COLUMN embedding VECTOR(512)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE marketplace_categories
        DROP COLUMN embedding
        `);
  }
}
