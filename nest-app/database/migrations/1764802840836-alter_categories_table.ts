import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCategoriesTable1764802840836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'categories',
      new TableColumn({
        name: 'categoryId',
        type: 'int',
      }),
      new TableColumn({
        name: 'categoryId',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'categories',
      new TableColumn({
        name: 'categoryId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'categoryId',
        type: 'int',
      }),
    );
  }
}
