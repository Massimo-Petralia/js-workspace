import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateSuppliersTable1764521085243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
              new Table({
                name: 'suppliers',
                columns: [
                  {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                  },
                  {
                    name: 'supplier',
                    type: 'varchar',
                  },
                ],
              }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('suppliers');
    }

}
