import {Component} from '@angular/core';
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BaseDashboardPageComponent} from "../base-dashboard-page/base-dashboard-page.component";
import {ArticleState} from "../../../states/article.state";

@Component({
  selector: 'app-article-base-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent extends BaseDashboardPageComponent<Article>{
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'category', 'mainTitle', 'tags', 'actions'];
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected _articleService: ArticleService,
    protected override _state: ArticleState,
  ) {
    super(_activatedRoute, _router, _matDialog, _articleService, _state);
  }

}
