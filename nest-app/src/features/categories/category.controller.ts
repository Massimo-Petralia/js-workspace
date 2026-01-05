import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SupplierCategoryEntity } from './entity/supplier-category.entity';

@Controller('api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('categories')
  async getCategories() {
    let categories: SupplierCategoryEntity[] = [];
    await this.categoryService
      .getCategories()
      .then((response) => (categories = response));
    return categories;
  }

  @Get('categories/:id')
  async getCategoryNodes(@Param('id') id: number) {
    let categories: SupplierCategoryEntity[] = [];
    await this.categoryService
      .getCategoryChildren(id)
      .then((response) => (categories = response));
    return categories;
  }
}
