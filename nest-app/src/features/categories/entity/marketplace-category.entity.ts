import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

const tableName = (): string => 'marketplace_categories';

@Entity(tableName())
export class MarketplaceCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  level: number;

  @ManyToOne(() => MarketplaceCategoryEntity, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: MarketplaceCategoryEntity;

  @OneToMany(() => MarketplaceCategoryEntity, (category) => category.parent)
  children: MarketplaceCategoryEntity[];
}
