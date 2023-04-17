import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  // эта строка должна идти последней, в начале идут фича модули, иначе с ростом проекта можно будет поломать роутинг
  // т.к. порядок поиска роутинга идёт сверху вниз
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
  {
    path: '', redirectTo: 'admin', pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
