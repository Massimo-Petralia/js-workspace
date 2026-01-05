import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTestCategoryEmbeddingsTable1767523460732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(
      'test_category_embenddings',
      'test_category_embeddings',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(
      'test_category_embeddings',
      'test_category_embenddings',
    );
  }
}
