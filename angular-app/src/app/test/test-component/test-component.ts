import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Greeting } from 'shared';

@Component({
  selector: 'app-test-component',
  imports: [],
  templateUrl: './test-component.html',
  styleUrl: './test-component.scss',
})
export class TestComponent {

  greeting: Greeting = {message: ''};

  constructor (private http: HttpClient) {}

  ngOnInit(){
    this.http.get<Greeting>('api/hello').
    subscribe((res) => this.greeting = res);
  }

}
