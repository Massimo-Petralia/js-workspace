import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCategoriesTable1765198634436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('categories', 'supplier_categories');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('supplier_categories', 'categories');
  }
}
