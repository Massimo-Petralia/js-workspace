import { SupplierCategoryEntity } from '../entity/supplier-category.entity';
import { MarketplaceCategoryEntity } from '../entity/marketplace-category.entity';
import { Repository } from 'typeorm';

type RepositoryType = SupplierCategoryEntity | MarketplaceCategoryEntity;

export class CategoryRepository {
  constructor() {}

  async setEmbedding(
    repository:
      | Repository<SupplierCategoryEntity>
      | Repository<MarketplaceCategoryEntity>,
    category: RepositoryType,
    index: number,
    embeddings: number[][],
  ) {
    await repository.update(
      { id: category.id },
      { embedding: embeddings[index] },
    );
    console.log(
      'current processed element: ',
      `index: ${index} id: ${category.id}`,
    );
  }
}
