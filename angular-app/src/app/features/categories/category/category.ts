import { Component, Input } from '@angular/core';
import { CategoryInterface } from 'shared';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {

  @Input() category!: CategoryInterface;

}
