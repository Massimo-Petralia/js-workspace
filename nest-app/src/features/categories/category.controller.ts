import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
//import { SupplierCategoryEntity } from './entity/supplier-category.entity';
import { CategoryInterface } from 'shared';
import { FileService } from '../file/file.service';

@Controller('api')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private fileService: FileService,
  ) {}

  @Get('categories')
  async getCategories() {
    let categories: CategoryInterface[] = [];
    await this.categoryService.getCategories().then(
      (response) =>
        (categories = response.map((category) => {
          return {
            id: category.id,
            name: category.name,
            parent_id: category.parent_id,
            level: category.level,
            marketplace_category: category.marketplace_category,
          };
        })),
    );
    return categories;
  }

  @Get('categories/populate')
  async populateCategories(@Query('filename') fileName: string) {
    const data = await this.fileService.handleFile(
      process.env.STORAGE_BASE_PATH + `/${fileName}` + '.json',
    );
    await this.categoryService.populateCategories(data, undefined);
    return { filename: fileName };
  }

  @Get('categories/:id')
  async getCategoryNodes(@Param('id') id: number) {
    let categories: CategoryInterface[] = [];
    await this.categoryService.getCategoryChildren(id).then(
      (response) =>
        (categories = response.map((category) => {
          return {
            id: category.id,
            name: category.name,
            parent_id: category.parent_id,
            level: category.level,
            marketplace_category: category.marketplace_category,
          };
        })),
    );
    return categories;
  }
}
