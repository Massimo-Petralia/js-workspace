import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToSupplierVategoriesTable1765473353638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'supplier_categories',
      new TableColumn({
        name: 'level',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('supplier_categories', 'level');
  }
}
