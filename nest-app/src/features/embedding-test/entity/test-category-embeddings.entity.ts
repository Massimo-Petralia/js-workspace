import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test_category_embeddings')
export class TestCategoryEmbeddingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  text: string;

  @Column({ type: 'vector', length: 512 })
  embedding: number[];
}
