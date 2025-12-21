import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

private httpClient = inject(HttpClient)

getCategories(): Observable<Category[]> {
  return this.httpClient.get<Category[]>('/api/categories');
}

getCategory(id: number | null): Observable<Category> {
  return this.httpClient.get<Category>(`/api/category/${id}`);
}
  
}
