import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ArticleDashboardPageComponent} from './components/article-dashboard-page/article-dashboard-page.component';
import {ArticleEditPageComponent} from './components/article-edit-page/article-edit-page.component';
import {ArticleResolver} from './resolvers/article.resolver';
import {SharedModule} from "./shared.module";

@NgModule({
  declarations: [
    ArticleDashboardPageComponent,
    ArticleEditPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ArticleDashboardPageComponent },
      { path: 'create', component: ArticleEditPageComponent },
      { path: ':id', component: ArticleEditPageComponent, resolve: { article: ArticleResolver } }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ArticleModule { }
