import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/categories/category-service';
import { Category } from 'shared';

@Component({
  selector: 'app-category-page',
  imports: [],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
 
private categoryService = inject(CategoryService);
categories: Category[] = [];

constructor() {
 // this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
}

}
