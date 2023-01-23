import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {UserslistComponent} from './userslist/userslist.component';
import {UserspageComponent} from './userspage/userspage.component';
import {ArticleComponent} from './article/article.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticlesPageComponent} from './articles-page/articles-page.component';
import {ArticlesListComponent} from './articles-list/articles-list.component';
import {ModalComponent} from './modal/modal.component';
import {AppRoutingModule} from "./app-routing.module";
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {LoginPageComponent} from './admin/login-page/login-page.component';
import {SharedModule} from "./shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserslistComponent,
    UserspageComponent,
    ArticleComponent,
    ArticlesPageComponent,
    ArticlesListComponent,
    ModalComponent,
    MainLayoutComponent,
    EditPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
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
