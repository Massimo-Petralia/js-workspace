import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const tableName = (): string => 'supplier_categories';

@Entity(tableName())
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  level: number;
}
