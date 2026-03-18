import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
//import { SupplierCategoryEntity } from './entity/supplier-category.entity';
import { CategoryInterface } from 'shared';

@Controller('api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('categories/populate')
  populateCategories(@Query('filename') fileName: string) {
    try {
      return { filename: fileName };
    } catch (error) {
      console.error('the error is : ', error);
    }
  }

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
