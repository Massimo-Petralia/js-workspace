import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

private httpClient = inject(HttpClient)

getCategories(): Observable<CategoryInterface[]> {
  return this.httpClient.get<CategoryInterface[]>('/api/categories');
}

getCategory(id: number): Observable<CategoryInterface> {
  return this.httpClient.get<CategoryInterface>(`/api/category/${id}`);
}
  
}
