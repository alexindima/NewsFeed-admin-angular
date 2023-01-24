import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {ArticleCreatePageComponent} from './article-create-page/article-create-page.component';
import {ArticleEditPageComponent} from './article-edit-page/article-edit-page.component';
import {UserCreatePageComponent} from './user-create-page/user-create-page.component';
import {UserEditPageComponent} from './user-edit-page/user-edit-page.component';
import {ArticleDashboardPageComponent} from './article-dashboard-page/article-dashboard-page.component';
import {UserDashboardPageComponent} from './user-dashboard-page/user-dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {SharedModule} from "../shared.module";
import {AuthGuard} from "./services/auth.guard";
import {CategoriesService} from "./services/categories.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {TagsService} from "./services/tags.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: "full"},
          {path: 'login', component: LoginPageComponent},
          {path: 'articles', component: ArticleDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-article', component: ArticleCreatePageComponent, canActivate: [AuthGuard]},
          {path: 'article/:id/edit', component: ArticleEditPageComponent, canActivate: [AuthGuard]},
          {path: 'users', component: UserDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-user', component: UserCreatePageComponent, canActivate: [AuthGuard]},
          {path: 'user/:id/edit', component: UserEditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    ArticleDashboardPageComponent,
    ArticleCreatePageComponent,
    ArticleEditPageComponent,
    UserDashboardPageComponent,
    UserCreatePageComponent,
    UserEditPageComponent
  ],
  providers: [AuthService, AuthGuard, CategoriesService, TagsService]
})
export class AdminModule {
}
