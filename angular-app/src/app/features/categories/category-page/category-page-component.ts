import { Component, inject, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/categories/category-service';
import { CategoryInterface } from 'shared';
import { CategoryComponent } from '../category/category-component';
import { CategoryControlComponent } from '../category-control/category-control';

@Component({
  selector: 'app-category-page-component',
  imports: [CategoryComponent, CategoryControlComponent],
  templateUrl: './category-page-component.html',
  styleUrl: './category-page-component.scss',
})
export class CategoryPageComponent {
  private categoryService = inject(CategoryService);

  categories: CategoryInterface[] = [];

  constructor() {
    this.categoryService
      .getTopCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onFileName(fileName: string) {
    this.categoryService.populateDatabase(fileName).subscribe((response) => {
      if (response.filename === fileName) {
        alert(`The database is now populated with ${response.filename}`);
      } else alert('Somethig went wrong !');
    });
    //console.log('filename', response);
  }
}
