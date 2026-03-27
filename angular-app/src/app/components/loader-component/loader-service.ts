import { Injectable } from '@angular/core';
import { LoaderComponent } from './loader-component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private map = new Map<string, LoaderComponent>();

  register(id: string, instance: LoaderComponent) {
    this.map.set(id, instance);
  }

  unregister(id: string) {
    this.map.delete(id);
  }

  get(id: string) {
   return this.map.get(id);
  }

}
