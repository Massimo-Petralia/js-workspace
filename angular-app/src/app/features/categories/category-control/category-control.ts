import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader-component/loader-component';

@Component({
  selector: 'app-category-control',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './category-control.html',
  styleUrl: './category-control.scss',
})
export class CategoryControlComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Output() fileName = new EventEmitter<string>();

  formCategory = this.formBuilder.group({
    selectFile: this.formBuilder.control<string>('supplier_categories'),
  });

  emitFileName() {
    if(this.formCategory.controls.selectFile.value !== null)
    this.fileName.emit(this.formCategory.controls.selectFile.value);
  }

  ngOnInit(): void {}
}
