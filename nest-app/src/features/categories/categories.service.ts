import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplier: string = 'categories-B';
  public categories: CategoryTaxonomy[] = [];
  public children: CategoryTaxonomy[] = [];
  constructor(
    private fileService: FileService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.getData();
    await this.saveCategory(this.categories);
  }

  async getData() {
    const response = await this.fileService.handleFile(
      process.env.STORAGE_BASE_URL + '/' + this.supplier + '.json',
    );
    this.categories = response;
  }

  async saveCategory(categories: CategoryTaxonomy[]) {
    for (const category of categories) {
      const categoryRow = await this.categoryRepository.save({
        name: category.name,
      });
      console.log('row created: ' + JSON.stringify(categoryRow));
    }
  }
}
