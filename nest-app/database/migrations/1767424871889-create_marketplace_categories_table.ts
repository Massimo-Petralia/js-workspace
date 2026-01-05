import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMarketplaceCategoriesTable1767424871889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'marketplace_categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'marketplace_categories',
      new TableForeignKey({
        name: 'fk_marketplace_categories_parent_child',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'marketplace_categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'marketplace_categories',
      'fk_marketplace_categories_parent_child',
    );
    await queryRunner.dropTable('marketplace_categories');
  }
}
