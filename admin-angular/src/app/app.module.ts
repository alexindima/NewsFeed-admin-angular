import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {LoginPageComponent} from './admin/components/login-page/login-page.component';
import {SharedModule} from "./shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    // почти ни один из этих модулей не придется подключать, если их все перенести в Shared
    FormsModule,
    AppRoutingModule, // этот модуль точно принадлежит App Module, остальные - Shared модули
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
