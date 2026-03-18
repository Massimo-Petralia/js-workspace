import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { CategoryInterface } from 'shared';
import { CategoryComponent } from '../../features/categories/category/category-component';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient);

  constructor(private childRegistryService: ChildRegistryService) {}

  populateDatabase(fileName: string): Observable<{filename: string}> {
    return this.httpClient.get<{filename: string}>(`/api/categories/populate?filename=${fileName}`);
  }

  getTopCategories(): Observable<CategoryInterface[]> {
    return this.httpClient.get<CategoryInterface[]>('/api/categories');
  }

  getCategoryChildren(id: number) {
    const categoryComponent = this.childRegistryService.get(id);
    const categoryObservable = this.httpClient.get<CategoryInterface[]>(`/api/categories/${id}`);
    categoryObservable.subscribe((response) => {
      if(!categoryComponent) return;
      categoryComponent.category.children = response;
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChildRegistryService {
  
  private map = new Map<number, CategoryComponent>();

  register(id: number, instance: CategoryComponent) {
    this.map.set(id, instance);
  }

  unregister(id: number) {
    this.map.delete(id);
  }

  get(id: number) {
    return this.map.get(id);
  }
}
