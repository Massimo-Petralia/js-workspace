import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryPageComponent } from './features/categories/category-page/category-page-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoryPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-app');
}
