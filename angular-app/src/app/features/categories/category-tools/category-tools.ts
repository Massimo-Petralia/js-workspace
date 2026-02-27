import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader-component/loader-component';

@Component({
  selector: 'app-category-tools',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './category-tools.html',
  styleUrl: './category-tools.scss',
})
export class CategoryTools implements OnInit {
  private formBuilder = inject(FormBuilder);

  formCategory = this.formBuilder.group({
    selectFile: this.formBuilder.control<string>('Supplier categories'),
  });

  readSelect() {
    console.log(this.formCategory.controls.selectFile.value);
  }

  ngOnInit(): void {}
}
