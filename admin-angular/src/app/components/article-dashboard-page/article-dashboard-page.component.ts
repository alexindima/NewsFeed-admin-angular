import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BaseDashboardPageComponent} from "../base-dashboard-page/base-dashboard-page.component";
import {ArticleState} from "../../states/article.state";
import {MatTable} from "@angular/material/table";
import {Article} from "../../entities/article.interface";

@Component({
  selector: 'app-article-base-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent extends BaseDashboardPageComponent<Article> implements AfterViewInit, OnDestroy{
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'category', 'mainTitle', 'tags', 'actions'];
  @ViewChild(MatTable) table!: MatTable<Article>;
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected _articleService: ArticleService,
    protected override _state: ArticleState,
  ) {
    super(_activatedRoute, _router, _matDialog, _articleService, _state);
  }

  onWindowResize = () => {
    this.table.updateStickyColumnStyles();
  }

  ngAfterViewInit(): void {
    // здесь сложный момент, но привычнее при rxjs будет видеть через
    // fromEvent(window, 'resize'), т.к. тогда можно заюзать debounceTime и не нагружать так сильно приложение
    window.addEventListener('resize', this.onWindowResize);
  }

  override ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    super.ngOnDestroy();
  }

}
