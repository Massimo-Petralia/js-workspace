import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('api')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('categories')
  async getCategories() {
    let categories: Category[] = [];
    await this.categoryService
      .getCategories()
      .then((response) => (categories = response));
    return categories;
  }
}
