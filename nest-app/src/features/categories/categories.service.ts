import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplier: string = 'categories-A';
  public categories: CategoryTaxonomy[] = [];
  public categoryId: number | null = null;
  public children: CategoryTaxonomy[] = [];
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
      process.env.STORAGE_BASE_URL + '/' + this.supplier + '.json',
    );
    this.categories = response;
  }

  async populateCategories(
    categories: CategoryTaxonomy[],
    parentId: number | undefined,
  ) {
    for (const category of categories) {
      const categoryRow = await this.categoryRepository.save({
        name: category.name,
        parentId: parentId,
      });
      const name: string = categoryRow.name;
      const categoryId: string = categoryRow.id.toString();
      const parentIdValue: number | null = categoryRow.parentId;
      console.log(
        'name: ' +
          name +
          ' id: ' +
          categoryId +
          ' parentId: ' +
          JSON.stringify(parentIdValue),
      );
      if (category.children.length !== 0) {
        function normalizeChildren(): CategoryTaxonomy[] {
          const children: CategoryTaxonomy[] = [];
          for (let child of category.children) {
            child = { ...child, parentId: categoryRow.id };
            children.push(child);
          }
          return children;
        }
        console.log(
          'normalized children: ',
          JSON.stringify(normalizeChildren()),
        );
        await this.populateCategories(normalizeChildren(), categoryRow.id);
      }
    }
  }
}
