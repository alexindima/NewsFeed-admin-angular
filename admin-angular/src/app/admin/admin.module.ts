import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {ArticleCreatePageComponent} from './components/article-create-page/article-create-page.component';
import {UserCreatePageComponent} from './components/user-create-page/user-create-page.component';
import {ArticleDashboardPageComponent} from './components/article-dashboard-page/article-dashboard-page.component';
import {UserDashboardPageComponent} from './components/user-dashboard-page/user-dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {SharedModule} from "../shared.module";
import {AuthGuard} from "./guards/auth.guard";
import {CategoriesService} from "./services/categories.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {TagsService} from "./services/tags.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersService} from "./services/users.service";
import {ArticlesService} from "./services/articles.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmDialogModalComponent} from './components/shared/confirm-dialog-modal/confirm-dialog-modal.component';
import {ArrayToStringPipe} from "./components/shared/array-to-string.pipe";
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {UserResolver} from "./resorvers/user.resolver";
import {ArticleResolver} from "./resorvers/article.resolver";
import {CategoriesResolver} from "./resorvers/categories.resolver";
import {TagsResolver} from "./resorvers/tags.resolver";

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
          {
            path: 'article/:id', component: ArticleCreatePageComponent, canActivate: [AuthGuard], resolve: {
              article: ArticleResolver,
              categories: CategoriesResolver,
              tags: TagsResolver
            }
          },
          {path: 'users', component: UserDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-user', component: UserCreatePageComponent, canActivate: [AuthGuard]},
          {
            path: 'user/:id', component: UserCreatePageComponent, canActivate: [AuthGuard], resolve: {
              user: UserResolver
            }
          },
          {path: '**', component: NotFoundPageComponent}
        ]
      }
    ]),
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    ArticleDashboardPageComponent,
    ArticleCreatePageComponent,
    UserDashboardPageComponent,
    UserCreatePageComponent,
    ConfirmDialogModalComponent,
    ArrayToStringPipe,
    NotFoundPageComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoriesService,
    CategoriesResolver,
    TagsService,
    TagsResolver,
    UsersService,
    UserResolver,
    ArticlesService,
    ArticleResolver]
})
export class AdminModule {
}
