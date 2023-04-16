import {NgModule} from "@angular/core";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

// а также сюда попадают формы, роутинг модули, всякие визуальные компоненты, которые мы подключаем в feature модули
@NgModule({
  imports: [
    CKEditorModule,
    HttpClientModule,
  ], // когда добавляется новая запись эту скобку придётся переносить ниже, ей идеально располагаться на отдельной строке
  exports: [
    CKEditorModule,
    HttpClientModule,
  ]
})
export class SharedModule {

}
