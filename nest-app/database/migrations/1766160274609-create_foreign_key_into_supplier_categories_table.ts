import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateForeignKeyIntoSupplierCategoriesTable1766160274609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'supplier_categories',
      'parentId',
      'parent_id',
    );
    await queryRunner.createForeignKey(
      'supplier_categories',
      new TableForeignKey({
        name: 'fk_categories_parent_child',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'supplier_categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'supplier_categories',
      'parent_id',
      'parentId',
    );
    await queryRunner.dropForeignKey(
      'supplier_categories',
      'fk_categories_parent_child',
    );
  }
}
