import { Component, inject, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/categories/category-service';
import { CategoryInterface } from 'shared';
import { CategoryComponent } from '../category/category-component';
import { CategoryControlComponent } from '../category-control/category-control';
import { LoaderService } from '../../../components/loader-component/loader-service';

@Component({
  selector: 'app-category-page-component',
  imports: [CategoryComponent, CategoryControlComponent],
  templateUrl: './category-page-component.html',
  styleUrl: './category-page-component.scss',
})
export class CategoryPageComponent {
  private categoryService = inject(CategoryService);

  categories: CategoryInterface[] = [];

  populateDatabaseRes: {message: string} = {message: ''};

  constructor(private loaderService: LoaderService) {
    this.categoryService
      .getTopCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onFileName(fileName: string) {
    const loader = this.loaderService.get('loader-populate-db');
    console.log('type is: ', typeof loader);
    this.categoryService.populateDatabase(fileName).subscribe((response) => {
      if (response.filename === fileName) {
        this.populateDatabaseRes = {message: `The database is now populated with ${response.filename}`};
        loader?.loading.set(false);
      } else {
        this.populateDatabaseRes = {message: 'Somethig went wrong !'};
        loader?.loading.set(false);
      }
    });
  }
}
