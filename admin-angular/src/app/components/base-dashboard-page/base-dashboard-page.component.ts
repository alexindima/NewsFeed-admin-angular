import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Subs } from '../../utils/subs';
import {ConfirmDialogModalComponent, ModalDialogData} from '../confirm-dialog-modal/confirm-dialog-modal.component';
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

  // эта фича вообще не принадлежит пейдже, под неё надо создавать отдельный компонент, пейджи не должны являться свалкой фич
  // профит будет в независимости фич и _service не придётся передавать в базовый класс
  openDeleteModal(item: T, type: string, name: string) {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm Delete',
        text: `Are you sure you want to delete this ${type}: "${name}"?`,
        button: 'Delete',
      } as ModalDialogData,
    });

    this._subs.add = dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if (result) {
          return this._service.deleteItem(item.id!).pipe(tap(() => this.getItems()));
        }
        return of(null);
      })
    ).subscribe();
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
