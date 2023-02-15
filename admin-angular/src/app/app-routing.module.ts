import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  // эта строка должна идти последней, в начале идут фича модули, иначе с ростом проекта можно будет поломать роутинг
  // т.к. порядок поиска роутинга идёт сверху вниз
  {
    path: '', redirectTo: 'admin', pathMatch: "full"
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
