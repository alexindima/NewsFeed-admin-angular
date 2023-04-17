import {NgModule} from "@angular/core";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

// а также сюда попадают формы, роутинг модули, всякие визуальные компоненты, которые мы подключаем в feature модули
@NgModule({
  imports: [
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ], // когда добавляется новая запись эту скобку придётся переносить ниже, ей идеально располагаться на отдельной строке
  exports: [
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule {

}
