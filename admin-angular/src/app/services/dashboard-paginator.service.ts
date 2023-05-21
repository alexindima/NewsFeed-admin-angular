import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subs} from "../utils/subs";
import {PaginatorSettings} from "../entities/paginator.interface";
import {PageEvent} from "@angular/material/paginator";
import {QueryParamService} from "./query-param.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardPaginatorService implements OnInit, OnDestroy {
  protected _subs = new Subs();
  public settings: BehaviorSubject<PaginatorSettings> = new BehaviorSubject<PaginatorSettings>({
    length: 0,
    pageSize: 25,
    pageIndex: 0,
  });

  protected constructor(
    protected _queryParamService: QueryParamService,
  ) {
  }

  ngOnInit() {
    const urlQueryParams = this._queryParamService.getAllQueryParams();
    const pageIndex: number | null = +urlQueryParams['page'] - 1;
    const pageSize: number | null = +urlQueryParams['pageSize'];

    if(pageIndex || pageSize){
      const currentSettings = this.settings.getValue();
      currentSettings.pageSize = pageSize || currentSettings.pageSize;
      currentSettings.pageIndex = pageIndex || currentSettings.pageIndex;
      this.settings.next(currentSettings);
    }
  }

  change($event: PageEvent) {
    const currentSettings = this.settings.getValue();
    currentSettings.length = $event.length;
    currentSettings.pageSize = $event.pageSize;
    currentSettings.pageIndex = $event.pageIndex;
    this.settings.next(currentSettings);
  }

  setLength(length: number) {
    const currentSettings = this.settings.getValue();
    currentSettings.length = length;
    this.settings.next(currentSettings);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
