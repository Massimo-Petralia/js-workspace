import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryHelper } from './helpers/category.helper';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplierCategories: string = 'supplier_categories';
  public categories: CategoryTaxonomy[] = [];
  categoryHelper = new CategoryHelper();
  constructor(
    private fileService: FileService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.getDataFile();
    await this.populateCategories(this.categories, undefined);
  }

  async getDataFile() {
    const response = await this.fileService.handleFile(
      process.env.STORAGE_BASE_PATH + '/' + this.supplierCategories + '.json',
    );
    this.categories = response;
  }

  async populateCategories(
    categories: CategoryTaxonomy[],
    parentId: number | undefined,
    depth: number | undefined = 0,
  ) {
    for (const category of categories) {
      const categoryRow = await this.categoryRepository.save({
        name: category.name,
        parentId: parentId,
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
