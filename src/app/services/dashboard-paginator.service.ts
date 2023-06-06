import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subs} from "../utils/subs";
import {PaginatorSettings} from "../entities/paginator.interface";
import {PageEvent} from "@angular/material/paginator";
import {QueryParamService} from "./query-param.service";
import {ArticleUserQueryPaginator} from "../entities/service.interface";

@Injectable()
export class DashboardPaginatorService{
  protected _subs = new Subs();
  public settings$: BehaviorSubject<PaginatorSettings> = new BehaviorSubject<PaginatorSettings>({
    length: 0,
    pageSize: 25,
    pageIndex: 0,
  });
  public needToLoad$: BehaviorSubject<ArticleUserQueryPaginator> = new BehaviorSubject<ArticleUserQueryPaginator>({
    pageIndex: this.settings$.getValue().pageIndex,
    pageSize: this.settings$.getValue().pageSize
  });

  constructor(
    private _queryParamService: QueryParamService,
  ) {
  }

  change($event: PageEvent) {
    const currentSettings = this.settings$.getValue();
    currentSettings.length = $event.length;
    currentSettings.pageSize = $event.pageSize;
    currentSettings.pageIndex = $event.pageIndex;
    this.settings$.next(currentSettings);
    this.needToLoad$.next({pageIndex: currentSettings.pageIndex + 1, pageSize: currentSettings.pageSize});
  }

  setData(index: number | null, size: number | null) {
    const currentSettings = this.settings$.getValue();
    currentSettings.pageSize = size || currentSettings.pageSize;
    currentSettings.pageIndex = index || currentSettings.pageIndex;
    this.settings$.next(currentSettings);
    this.needToLoad$.next({pageIndex: currentSettings.pageIndex + 1, pageSize: currentSettings.pageSize});
  }

  setLength(length: number) {
    const currentSettings = this.settings$.getValue();
    currentSettings.length = length;
    this.settings$.next(currentSettings);
  }
}
