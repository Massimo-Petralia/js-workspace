import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CategoryInterface } from 'shared';
import { ChildRegistryService } from '../../../services/categories/category-service';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit, OnDestroy {

  @Input() category!: CategoryInterface;



  constructor(private childRegistryService: ChildRegistryService) {}

  ngOnInit(): void {
    this.childRegistryService.register(this.category.id, this);
  }

  ngOnDestroy(): void {
    this.childRegistryService.unregister(this.category.id);
  }

  getChildren() {
    this.childRegistryService.getChildren(this.category.id);
  }


}
