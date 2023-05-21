import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, Tag} from "../../entities/category-tag.interface";
import {UserService} from "../../services/user.service";
import {UserState} from "../../states/user.state";
import {CategoryState} from "../../states/category.state";
import {TagState} from "../../states/tag.state";
import {User} from "../../entities/user.interface";
import {DeleteUserModalComponent} from "../delete-user-modal/delete-user-modal.component";
import {DashboardPaginatorService} from "../../services/dashboard-paginator.service";
import {ArticleUserQueryPaginator} from "../../entities/service.interface";
import {PageEvent} from "@angular/material/paginator";
import {Subs} from "../../utils/subs";
import {PaginatorSettings} from "../../entities/paginator.interface";

@Component({
  selector: 'app-user-base-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['userId', 'role', 'createdAt', 'name', 'email', 'categories', 'tags', 'actions'];
  private _subs = new Subs();
  itemsList: User[] = [];
  paginatorSettings!: PaginatorSettings;
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  constructor(
    private _userService: UserService,
    private  _userState: UserState,
    private _categoryState: CategoryState,
    private _tagState: TagState,
    private _dashboardPaginatorService: DashboardPaginatorService,
    public deleteUserModal: DeleteUserModalComponent,

  ) {
  }
  ngOnInit(): void {
    this._subs.add = this.deleteUserModal.needToUpdate$.subscribe(() => this.loadItem())
    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._tagState.items$.subscribe((data) => {
      this.tagsList = data;
    })
    this._subs.add = this._userState.count$.subscribe((count) => {
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
    this._subs.add = this._userService.getPaginatedItems(currentPagination).subscribe((result: User[]) => {
      this.itemsList = result;
    });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

