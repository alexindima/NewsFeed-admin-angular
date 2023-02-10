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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersService} from "./services/users.service";
import {ArticlesService} from "./services/articles.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmDialogModalComponent} from './components/confirm-dialog-modal/confirm-dialog-modal.component';
import {ArrayToStringPipe} from "./utils/array-to-string.pipe";
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {UserResolver} from "./resorvers/user.resolver";
import {ArticleResolver} from "./resorvers/article.resolver";
import {SharedTagsService} from "./services/shared-tags.service";
import {SharedCategoriesService} from "./services/shared-categories.service";

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
              article: ArticleResolver
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
    SharedTagsService,
    SharedCategoriesService,
    UsersService,
    UserResolver,
    ArticlesService,
    ArticleResolver]
})
export class AdminModule {
  constructor(public sharedCategoriesService: SharedCategoriesService,
              private sharedTagsService: SharedTagsService) {
    sharedCategoriesService.updateCategoryList();
    sharedTagsService.updateTagsList();
  }
}
