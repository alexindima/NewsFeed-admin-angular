import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../guards/auth.guard";
import {CategoryResolver} from "../resolvers/category.resolver";
import {TagResolver} from "../resolvers/tag.resolver";
import {ArticleResolver} from "../resolvers/article.resolver";
import {UserResolver} from "../resolvers/user.resolver";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {UserEditPageComponent} from "./components/user-edit-page/user-edit-page.component";
import {AdminLayoutComponent} from "./components/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {ArticleDashboardPageComponent} from "./components/article-dashboard-page/article-dashboard-page.component";
import {ArticleEditPageComponent} from "./components/article-edit-page/article-edit-page.component";
import {UserDashboardPageComponent} from "./components/user-dashboard-page/user-dashboard-page.component";
import {LoginGuard} from "../guards/login.guard";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, resolve: {
      categories: CategoryResolver,
      tags: TagResolver,
    }, children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
      // весь article - отдельный модуль, так же и с юзерами, у тебя нарушение REST именований в урлах, смотри как я делал на курсах
      { path: 'articles', component: ArticleDashboardPageComponent, canActivate: [AuthGuard]},
      { path: 'new-article', component: ArticleEditPageComponent, canActivate: [AuthGuard] },
      {
        path: 'article/:id', component: ArticleEditPageComponent, canActivate: [AuthGuard], resolve: {
          article: ArticleResolver
        }
      },
      { path: 'users', component: UserDashboardPageComponent, canActivate: [AuthGuard] },
      { path: 'new-user', component: UserEditPageComponent, canActivate: [AuthGuard] },
      {
        path: 'user/:id', component: UserEditPageComponent, canActivate: [AuthGuard], resolve: {
          user: UserResolver
        }
      },
      { path: '**', component: NotFoundPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
