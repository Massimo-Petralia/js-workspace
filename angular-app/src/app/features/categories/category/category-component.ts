import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, signal } from '@angular/core';
import { CategoryInterface } from 'shared';
import {
  CategoryService,
  ChildRegistryService,
} from '../../../services/categories/category-service';

@Component({
  selector: 'app-category-component',
  imports: [],
  templateUrl: './category-component.html',
  styleUrl: './category-component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Input() category!: CategoryInterface;

  isOpen = signal<boolean>(false);

  constructor(
    private categoryService: CategoryService,
    private childRegistryService: ChildRegistryService
  ) {}

  ngOnInit(): void {
    this.childRegistryService.register(this.category.id, this);
  }

  ngOnDestroy(): void {
    this.childRegistryService.unregister(this.category.id);
  }

  getChildren() {
    if (!this.hasChildren()) {
      this.categoryService.getCategoryChildren(this.category.id);
    }
    this.toggleNode();
  }

  toggleNode() {
    this.isOpen.set(!this.isOpen());
  }

  hasChildren(): boolean {
    return !!this.category.children?.length;
  }

  isExpandable(): boolean {
    return this.isOpen() && this.hasChildren();
  }
}
