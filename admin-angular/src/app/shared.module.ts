import {NgModule} from "@angular/core";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatNativeDateModule} from "@angular/material/core";

// а также сюда попадают формы, роутинг модули, всякие визуальные компоненты, которые мы подключаем в feature модули
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
  ], // когда добавляется новая запись эту скобку придётся переносить ниже, ей идеально располагаться на отдельной строке
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
  ]
})
export class SharedModule {

}
