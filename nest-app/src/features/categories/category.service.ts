import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierCategoryEntity } from './entity/supplier-category.entity';
import { Repository, IsNull } from 'typeorm';
import { CategoryHelper } from './helpers/category.helper';
import { MarketplaceCategoryEntity } from './entity/marketplace-category.entity';
import { TfService } from '../tensorflowjs/tensorflowjs.service';
import { CategoryRepository } from './category-repository/category-repository';

@Injectable()
export class CategoryService implements OnModuleInit {
  categoriesFileName: string = 'marketplace_categories';
  public categories: SupplierCategoryEntity[] = [];

  categoryHelper = new CategoryHelper();
  constructor(
    private fileService: FileService,
    @InjectRepository(SupplierCategoryEntity)
    private supplierCategoryRepository: Repository<SupplierCategoryEntity>,
    @InjectRepository(MarketplaceCategoryEntity)
    private marketplaceCategoryRepository: Repository<MarketplaceCategoryEntity>,
    private tfService: TfService,
    private categoryRepository: CategoryRepository,
  ) {}

  async onModuleInit() {
    await this.tfService.ready();
    //void this.addEmbedding();
    //void this.associateCategoriesByDistance();
  }

  getAllCategories(
    categories: SupplierCategoryEntity[] | MarketplaceCategoryEntity[],
  ) {
    return categories;
  }

  async addEmbedding() {
    const entities = await this.supplierCategoryRepository.find();
    const embeddings = await this.tfService.embed(
      entities.map((category) => category.name),
    );
    for (const [index, category] of entities.entries()) {
      await this.categoryRepository.setEmbedding(
        this.supplierCategoryRepository,
        category,
        index,
        embeddings,
      );
    }
  }

  async associateCategoriesByDistance(limit = 1) {
    const entities = await this.supplierCategoryRepository.find();
    function toPgVector(v: number[]): string {
      return `[${v.join()}]`;
    }
    // eslint-disable-next-line prefer-const
    for (let entity of entities) {
      const qb = this.marketplaceCategoryRepository
        .createQueryBuilder('c')
        .select(['c.id', 'c.name'])
        .addSelect('c.embedding <=> :query', 'distance')
        .setParameter('query', toPgVector(entity.embedding))
        .orderBy('distance', 'ASC')
        .limit(limit);
      const association = await qb.getMany();
      await this.supplierCategoryRepository.update(
        {
          id: entity.id,
        },
        { marketplace_category: association[0].name },
      );
      console.log(association[0].name);
    }
  }

  async getCategories(): Promise<SupplierCategoryEntity[]> {
    return await this.supplierCategoryRepository.find({
      where: {
        parent_id: IsNull(),
      },
    });
  }

  async getCategoryChildren(id: number): Promise<SupplierCategoryEntity[]> {
    return await this.supplierCategoryRepository.find({
      where: {
        parent: { id },
      },
    });
  }

  async populateCategories(
    categories: CategoryTaxonomy[],
    parentId: number | undefined,
    depth: number | undefined = 0,
  ) {
    for (const category of categories) {
      const categoryRow = await this.marketplaceCategoryRepository.save({
        name: category.name,
        parent_id: parentId,
        level: depth,
      });
      if (category.children.length !== 0) {
        const transformedCategory = this.categoryHelper.transformedCategory(
          category,
          categoryRow,
        );
        await this.populateCategories(
          transformedCategory,
          categoryRow.id,
          depth + 1,
        );
      }
    }
  }
}
