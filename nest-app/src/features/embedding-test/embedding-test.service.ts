import { Injectable, OnModuleInit } from '@nestjs/common';
import { TfService } from '../tensorflowjs/tensorflowjs.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCategoryEmbeddingEntity } from './entity/test-category-embeddings.entity';

@Injectable()
export class EmbeddingTestService implements OnModuleInit {
  constructor(
    private tfService: TfService,
    @InjectRepository(TestCategoryEmbeddingEntity)
    private repo: Repository<TestCategoryEmbeddingEntity>,
  ) {}

  async onModuleInit() {
    await this.tfService.ready();

    const row = await this.repo.findOneBy({ id: 1 });
    const results = await this.searchSimilar(row!.embedding, 'B');
    console.log(results);
  }

  async add(source: string, texts: string[]) {
    const vectors = await this.tfService.embed(texts);
    const entities = texts.map((text, i) =>
      this.repo.create({
        source: source,
        text: text,
        embedding: vectors[i],
      }),
    );
    return this.repo.save(entities);
  }

  async testTensorFlow() {
    await this.add('A', [
      'Portable laptops',
      'Desktops tower',
      'Tablets',
      'Monitors',
      'Printers',
    ]);
    await this.add('B', [
      'Portable PCs',
      'Tower Units',
      'Slates',
      'Displays',
      'Printing Devices',
    ]);
  }

  searchSimilar(vector: number[], sourceFilter?: string, limit = 2) {
    function toPgVector(v: number[]): string {
      return `[${v.join()}]`;
    }
    const qb = this.repo
      .createQueryBuilder('c')
      .select(['c.id', 'c.source', 'c.text'])
      .addSelect('c.embedding <=> :query', 'distance')
      .setParameter('query', toPgVector(vector))
      .orderBy('distance', 'ASC')
      .limit(limit);
    if (sourceFilter) {
      qb.where('c.source = :source', { source: sourceFilter });
    }
    return qb.getRawAndEntities();
  }
}
