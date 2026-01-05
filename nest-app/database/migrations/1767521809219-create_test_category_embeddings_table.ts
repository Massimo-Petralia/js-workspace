import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTestCategoryEmbeddingsTable1767521809219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE test_category_embenddings (
        id SERIAL PRIMARY KEY,
        source TEXT NOT NULL,
        text TEXT NOT NULL,
        embedding VECTOR(512) NOT NULL
        )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE test_category_embenddings 
        `);
  }
}
