import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/categories/category-service';
import { CategoryInterface } from 'shared';
import { Category } from "../category/category";

@Component({
  selector: 'app-category-page',
  imports: [Category],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
 
private categoryService = inject(CategoryService);
categories: CategoryInterface[] = [];

constructor() {
 this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
}


}
