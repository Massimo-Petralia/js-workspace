import { Component, EventEmitter, inject, Input, OnInit, Output, OnChanges, SimpleChanges, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader-component/loader-component';

@Component({
  selector: 'app-category-control',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './category-control.html',
  styleUrl: './category-control.scss',
})
export class CategoryControlComponent implements OnInit, OnChanges {
  private formBuilder = inject(FormBuilder);

  @Input() populateDatabaseRes: {message: string} = {message: ''};

  @Output() fileName = new EventEmitter<string>();

  @Input() loading = signal<boolean>(false);

  idMap = new Map<string, string>();

  ngOnChanges(changes: SimpleChanges): void {
   const {populateDatabaseRes} = changes;
   if(populateDatabaseRes.firstChange) {
    return;
   }
   if(populateDatabaseRes.currentValue) {
    alert(this.populateDatabaseRes.message);
   }
  }

  formCategory = this.formBuilder.group({
    selectFile: this.formBuilder.control<string>('supplier_categories'),
  });

  emitFileName() {
    if(this.formCategory.controls.selectFile.value !== null)
    this.fileName.emit(this.formCategory.controls.selectFile.value);
    this.loading.set(true);
  }

  ngOnInit(): void {
    this.idMap.set('loader-populate-db', 'loader-populate-db')
  }
}
