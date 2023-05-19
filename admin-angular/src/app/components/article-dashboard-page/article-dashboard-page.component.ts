import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BaseDashboardPageComponent} from "../base-dashboard-page/base-dashboard-page.component";
import {ArticleState} from "../../states/article.state";
import {Article} from "../../entities/article.interface";
import {DeleteArticleModalComponent} from "../delete-article-modal/delete-article-modal.component";

@Component({
  selector: 'app-article-base-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent extends BaseDashboardPageComponent<Article> implements OnInit{
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'category', 'mainTitle', 'tags', 'actions'];
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected _articleService: ArticleService,
    protected override _state: ArticleState,
    public deleteArticleModal: DeleteArticleModalComponent,
  ) {
    super(_activatedRoute, _router, _matDialog, _articleService, _state);
  }

  override ngOnInit(): void {
    this._subs.add = this.deleteArticleModal.needToUpdate$.subscribe(() => this.getItems())
    super.ngOnInit();
  }
}
