import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

const tableName = (): string => 'supplier_categories';

@Entity(tableName())
export class SupplierCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  level: number;

  @ManyToOne(() => SupplierCategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: SupplierCategoryEntity;

  @OneToMany(() => SupplierCategoryEntity, (category) => category.parent)
  children: SupplierCategoryEntity[];
}
