import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('supplier_categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: number;
}
