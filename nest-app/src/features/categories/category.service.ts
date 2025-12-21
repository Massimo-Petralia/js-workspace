import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, IsNull } from 'typeorm';
import { CategoryHelper } from './helpers/category.helper';

@Injectable()
export class CategoryService implements OnModuleInit {
  supplierCategoriesFileName: string = 'supplier_categories';
  public categories: Category[] = [];

  categoryHelper = new CategoryHelper();
  constructor(
    private fileService: FileService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        parent_id: IsNull(),
      },
    });
  }

  async getCategoryChildren(id: number): Promise<Category[]> {
    return await this.categoryRepository.find({
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
      const categoryRow = await this.categoryRepository.save({
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
