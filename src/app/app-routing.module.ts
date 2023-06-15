import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./shared-components/not-found-page/not-found-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {LoginGuard} from "./guards/login.guard";
import {AuthGuard} from "./guards/auth.guard";
import {CategoryResolver} from "./resolvers/category.resolver";
import {TagResolver} from "./resolvers/tag.resolver";
import {ServerErrorPageComponent} from "./shared-components/server-error-page/server-error-page.component";

/*
  Лучше вынести все строки с роутами в enum и перенести в отдельный файл, например, routes.ts
  export enum Routes {
      Login = 'login',
      ...
  }
  и здесь уже вот так использовать: path: Routes.Login,
  так будет удобнее менять роуты в случае чего
*/
const routes: Routes = [
/* удобнее читать, когда каждое свойство с новой строчки
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
*/
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
  {
    path: '', resolve: {
      categories: CategoryResolver,
      tags: TagResolver,
    },
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'articles', loadChildren: () => import('./article.module').then(m => m.ArticleModule) },
      { path: 'users', loadChildren: () => import('./user.module').then(m => m.UsersModule) },
    ]
  },
  { path: 'server-error', component: ServerErrorPageComponent },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
