import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileService, CategoryTaxonomy } from '../file/file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService implements OnModuleInit {
  supplier: string = 'categories-B';
  constructor(
    private fileService: FileService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  onModuleInit() {
    void this.saveCategory();
  }

  async getData(): Promise<CategoryTaxonomy[]> {
    const response = await this.fileService.handleFile(
      process.env.STORAGE_BASE_URL + '/' + this.supplier + '.json',
    );
    return response;
  }

  async saveCategory() {
    const categories = await this.getData();
    for (const category of categories) {
      console.log(category.name);
    }
  }
}
