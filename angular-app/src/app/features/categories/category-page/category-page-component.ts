import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/categories/category-service';
import { CategoryInterface } from 'shared';
import { CategoryComponent } from '../category/category-component';

@Component({
  selector: 'app-category-page-component',
  imports: [CategoryComponent],
  templateUrl: './category-page-component.html',
  styleUrl: './category-page-component.scss',
})
export class CategoryPageComponent {
  private categoryService = inject(CategoryService);
  categories: CategoryInterface[] = [];

  constructor() {
    this.categoryService.getTopCategories().subscribe((categories) => (this.categories = categories));
  }
}
