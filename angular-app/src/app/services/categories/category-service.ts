import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from 'shared';
import { Category } from '../../features/categories/category/category';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

private httpClient = inject(HttpClient)

getCategories(): Observable<CategoryInterface[]> {
  return this.httpClient.get<CategoryInterface[]>('/api/categories');
}

getCategoryChildren(id: number): Observable<CategoryInterface[]> {
  return this.httpClient.get<CategoryInterface[]>(`/api/categories/${id}`);
}
  
}

@Injectable({
  providedIn: 'root',
})
export class ChildRegistryService {
  
  private map = new Map<number, Category>();
  
constructor(private categoryService: CategoryService) {}
  register(id: number, instance : Category) {
    this.map.set(id, instance);
  }

  unregister(id: number) {
    this.map.delete(id);
  }

  get(id: number) {
    return this.map.get(id);
  }

  getChildren(id: number) {
    const categoryNode = this.get(id);
    this.categoryService.getCategoryChildren(id).subscribe(response => {
      if(!categoryNode) return;
      categoryNode.category.children = response;

    })
  }

}
