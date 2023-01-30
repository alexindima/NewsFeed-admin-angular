import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ArticlesService} from "../services/articles.service";
import {Article} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../shared/confirm-dialog-modal/confirm-dialog-modal.component";

interface PaginatorSettings {
  length: number,
  pageSize: number,
  pageIndex: number,
  pageSizeOptions: number[],
  hidePageSize: boolean,
  showPageSizeOptions: boolean,
  showFirstLastButtons: boolean,
  disabled: boolean,
}

@Component({
  selector: 'app-article-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent implements OnInit {
  articlesList: Article[] = []
  paginatorSettings: PaginatorSettings = {
    length,
    pageSize: 25,
    pageIndex: 0,
    pageSizeOptions: [10, 25, 50],
    hidePageSize: false,
    showPageSizeOptions: true,
    showFirstLastButtons: true,
    disabled: false
  }
  pageEvent: PageEvent | undefined;

  constructor(private articlesService: ArticlesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.articlesService.getCountOfArticles()
      .pipe(
        switchMap(result => {
          this.paginatorSettings.length = result;
          return this.activatedRoute.queryParams;
        })
      )
      .subscribe(params => {
        const pageIndex = +params['page'] - 1;
        const pageSize = +params['limit'];
        if (pageSize) {
          this.paginatorSettings.pageSize = pageSize;
        }
        if (pageIndex) {
          this.paginatorSettings.pageIndex = pageIndex;
        }
        this.getArticles();
      });
  }

  getArticles(): void {
    if (this.paginatorSettings.length) {
      while ((this.paginatorSettings.pageIndex + 1) > Math.ceil(this.paginatorSettings.length / this.paginatorSettings.pageSize)) {
        this.paginatorSettings.pageIndex--;
      }
    }

    this.router.navigate([], {
      queryParams: {
        page: this.paginatorSettings.pageIndex + 1,
        limit: this.paginatorSettings.pageSize
      },
      queryParamsHandling: 'merge'
    }).then();

    this.articlesService.getArticles((this.paginatorSettings.pageIndex + 1), this.paginatorSettings.pageSize)
      .subscribe(result => {
        this.articlesList = result;
      })
  }

  openDeleteModal(article: Article): void {
    const dialogRef = this.matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        entity: "article",
        name: article.mainTitle
      } as ModalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articlesService.deleteArticle(article).pipe(
          switchMap(() => {
            return this.articlesService.getCountOfArticles()
          })
        ).subscribe(count => {
          this.paginatorSettings.length = count;
          this.getArticles();
        })
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.paginatorSettings.length = e.length;
    this.paginatorSettings.pageSize = e.pageSize;
    this.paginatorSettings.pageIndex = e.pageIndex;
    this.getArticles()
  }


}
