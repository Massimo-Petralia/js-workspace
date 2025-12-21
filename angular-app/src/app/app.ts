import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryPage } from './features/categories/category-page/category-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoryPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-app');
}
