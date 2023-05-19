import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Subs} from '../../utils/subs';
import {PaginatorSettings} from "../../entities/paginator.interface";
import {ArticleUserService} from "../../entities/service.interface";
import {ArticleUserState} from "../../entities/state.interface";

@Injectable()
export abstract class BaseDashboardPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected _subs = new Subs();
  itemsList: T[] = [];
  paginatorSettings: PaginatorSettings = {
    length: 0,
    pageSize: 25,
    pageIndex: 0,
  };
  protected constructor(
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router,
    protected _matDialog: MatDialog,
    protected _service: ArticleUserService<T>,
    protected _state: ArticleUserState,
  ) {}

  ngOnInit() {
    this._subs.add = this._state.count$.subscribe((count: number) => {
      this.paginatorSettings.length = count;
    })

    this._subs.add = this._activatedRoute.queryParams.pipe(
      take(1)
    ).subscribe((params) => {
      const pageIndex = +params['page'] - 1;
      const pageSize = +params['pageSize'];
      if (pageSize) {
        this.paginatorSettings.pageSize = pageSize;
      }
      if (pageIndex) {
        this.paginatorSettings.pageIndex = pageIndex;
      }
      this.getItems();
    });
  }

  getItems() {
    if (this.paginatorSettings.length) {
      while (this.paginatorSettings.pageIndex + 1 > Math.ceil(this.paginatorSettings.length / this.paginatorSettings.pageSize)) {
        this.paginatorSettings.pageIndex--;
      }
    }

    this._router.navigate([], {
      queryParams: {
        page: this.paginatorSettings.pageIndex + 1,
        limit: this.paginatorSettings.pageSize,
      },
      queryParamsHandling: 'merge',
    });

    // это можно сделать лучше, вместо передачи метода сервиса целиком надо создать абстрактный метод loadItems в этом классе и реализовывать его в потомках
    this._subs.add = this._service.getPaginatedItems(this.paginatorSettings.pageIndex + 1, this.paginatorSettings.pageSize).subscribe((result: T[]) => {
      this.itemsList = result;
    });
  }

  // PaginatorSettings должно являться классов, где будет метод change(), сейчас ты избежал полезного ООП для пагинации
  pageChanged($event: PageEvent) {
    this.paginatorSettings.length = $event.length;
    this.paginatorSettings.pageSize = $event.pageSize;
    this.paginatorSettings.pageIndex = $event.pageIndex;
    this.getItems();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
