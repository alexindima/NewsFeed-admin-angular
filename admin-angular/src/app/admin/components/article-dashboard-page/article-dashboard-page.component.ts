import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ArticlesService} from "../../services/articles.service";
import {Article, PaginatorSettings} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, of, switchMap, take, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../confirm-dialog-modal/confirm-dialog-modal.component";
import {Subs} from "../../utils/subs";

// уже видел в user dashboard, так нельзя, два источника одинаковой фичи
// далее весь фидбек будет в user-dashboard-page, здесь дублирование
// нельзя так, всё что общее выносится в отдельные классы

@Component({
  selector: 'app-article-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  articlesList: Article[] = []
  paginatorSettings: PaginatorSettings = {
    length,
    pageSize: 25,
    pageIndex: 0,
  }
  pageEvent: PageEvent | undefined;

  constructor(private _articlesService: ArticlesService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _matDialog: MatDialog) {
  }

  ngOnInit() {
    console.log('ngOnInit')

    this._subs.add = this._articlesService.countOfArticles.subscribe((count) => {
      this.paginatorSettings.length = count;
    })
    this._subs.add = this._activatedRoute.queryParams.pipe(
      take(1)
    ).subscribe(params => {
        const pageIndex = +params['page'] - 1;
        const pageSize = +params['pageSize'];
        if (pageSize) {
          this.paginatorSettings.pageSize = pageSize;
        }
        if (pageIndex) {
          this.paginatorSettings.pageIndex = pageIndex;
        }
        this.getArticles();

      });
  }

  getArticles() {
    if (this.paginatorSettings.length) {
      while ((this.paginatorSettings.pageIndex + 1) > Math.ceil(this.paginatorSettings.length / this.paginatorSettings.pageSize)) {
        this.paginatorSettings.pageIndex--;
      }
    }

    this._router.navigate([], {
      queryParams: {
        page: this.paginatorSettings.pageIndex + 1,
        limit: this.paginatorSettings.pageSize
      },
      queryParamsHandling: 'merge'
    }).then();

    this._subs.add = this._articlesService.getArticles((this.paginatorSettings.pageIndex + 1), this.paginatorSettings.pageSize)
      .subscribe(result => {
        this.articlesList = result;
      })
  }

  openDeleteModal(article: Article) {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm Delete',
        text: `Are you sure you want to delete article: "${article.mainTitle}"?`,
        button: 'Delete'
      } as ModalDialogData
    });

    this._subs.add = dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this._articlesService.deleteArticle(article.id!).pipe(
            tap(()=> {this.getArticles();})
          );
        }
        return of(null);
      })
    ).subscribe();
  }

  pageChanged($event: PageEvent) {
    this.paginatorSettings.length = $event.length;
    this.paginatorSettings.pageSize = $event.pageSize;
    this.paginatorSettings.pageIndex = $event.pageIndex;
    this.getArticles();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
