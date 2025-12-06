import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnIntoCategoriesTable1764956850477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('categories', 'categoryId', 'parentId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('categories', 'parentId', 'categoryId');
  }
}
