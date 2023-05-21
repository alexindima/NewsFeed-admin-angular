import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleState} from "../../states/article.state";
import {Article} from "../../entities/article.interface";
import {DeleteArticleModalComponent} from "../delete-article-modal/delete-article-modal.component";
import {DashboardPaginatorService} from "../../services/dashboard-paginator.service";
import {ArticleUserQueryPaginator} from "../../entities/service.interface";
import {PageEvent} from "@angular/material/paginator";
import {Subs} from "../../utils/subs";
import {PaginatorSettings} from "../../entities/paginator.interface";

@Component({
  selector: 'app-article-base-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'category', 'mainTitle', 'tags', 'actions'];
  private _subs = new Subs();
  itemsList: Article[] = [];
  paginatorSettings!: PaginatorSettings;
  constructor(
    private _articleService: ArticleService,
    private _articleState: ArticleState,
    private _dashboardPaginatorService: DashboardPaginatorService,
    public deleteArticleModal: DeleteArticleModalComponent,
  ) {
  }

  ngOnInit(): void {
    this._subs.add = this.deleteArticleModal.needToUpdate$.subscribe(() => this.loadItem())
    this._subs.add = this._articleState.count$.subscribe((count) => {
      this._dashboardPaginatorService.setLength(count);
    });
    this._subs.add = this._dashboardPaginatorService.settings.subscribe((settings) => {
      this.paginatorSettings = settings;
    });
    this.loadItem();
  }

  pageChanged($event: PageEvent) {
    this._dashboardPaginatorService.change($event);
    this.loadItem();
  }

  loadItem() {
    const currentPagination: ArticleUserQueryPaginator = {
      pageIndex: this.paginatorSettings.pageIndex + 1,
      pageSize: this.paginatorSettings.pageSize,
    }
    this._subs.add = this._articleService.getPaginatedItems(currentPagination).subscribe((result: Article[]) => {
      this.itemsList = result;
    });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
