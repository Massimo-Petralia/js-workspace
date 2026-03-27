import { Component, Input, signal, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './loader-service';

@Component({
  selector: 'app-loader-component',
  imports: [],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss',
})
export class LoaderComponent implements OnInit, OnChanges, OnDestroy {

constructor(private loaderService: LoaderService) {}

@Input() loading = signal<boolean>(false);

@Input() id: string = '';

ngOnInit(): void {
  this.loaderService.register(this.id, this);
}
ngOnChanges(changes: SimpleChanges): void {
  const {loading} = changes;
  if(loading) {
    this.loading.set(this.loading());
  }
}

ngOnDestroy(): void {
  this.loaderService.unregister(this.id);
}

}
