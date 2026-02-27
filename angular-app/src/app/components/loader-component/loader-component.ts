import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'app-loader-component',
  imports: [],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss',
})
export class LoaderComponent {
@Input() loading = signal<boolean>(false);
}
