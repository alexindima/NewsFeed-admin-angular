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
import {Subs} from "../../utils/subs";
import {PaginatorSettings} from "../../entities/paginator.interface";
import {QueryParamService} from "../../services/query-param.service";

@Component({
  selector: 'app-user-base-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss'],
  providers: [
    DashboardPaginatorService,
  ]
})
export class UserDashboardPageComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['userId', 'role', 'createdAt', 'name', 'email', 'categories', 'tags', 'actions'];
  private _subs = new Subs();
  itemsList: User[] = [];
  paginatorSettings!: PaginatorSettings;
  // а зачем здесь категории и тэги?, они же нигде ни в шаблоне, ни в коде не нужны
  // >> в итоге так и не реализовал ТАКСОНОМИЮ, эти две фичи - одинаковые совсем, происходит полное их дублирование
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  constructor(
    private _userService: UserService,
    private  _userState: UserState,
    private _categoryState: CategoryState,
    private _tagState: TagState,
    public dashboardPaginatorService: DashboardPaginatorService,
    private _queryParamService: QueryParamService,
    public deleteUserModal: DeleteUserModalComponent,
  ) {
  }
  ngOnInit(): void {
    const urlQueryParams = this._queryParamService.getAllQueryParams();
    const pageIndex: number | null = +urlQueryParams['page'] - 1;
    const pageSize: number | null = +urlQueryParams['pageSize'];
    this.dashboardPaginatorService.setData(pageIndex, pageSize);

    this._subs.add = this.deleteUserModal.needToUpdate$.subscribe(() => this.loadItem({
      pageIndex: this.paginatorSettings.pageIndex + 1,
      pageSize: this.paginatorSettings.pageSize
    }));
    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._tagState.items$.subscribe((data) => {
      this.tagsList = data;
    })
    this._subs.add = this._userState.count$.subscribe((count) => {
      this.dashboardPaginatorService.setLength(count);
    });
    this._subs.add = this.dashboardPaginatorService.settings$.subscribe((settings) => {
      this.paginatorSettings = settings;
    });
    this._subs.add = this.dashboardPaginatorService.needToLoad$.subscribe((query) => {
      this.setQueryParams(query);
      this.loadItem(query);
    })
  }

  loadItem(query: ArticleUserQueryPaginator) {
    this._subs.add = this._userService.getPaginatedItems(query).subscribe((result: User[]) => {
      this.itemsList = result;
    });
  }

  setQueryParams(query: ArticleUserQueryPaginator){
    this._queryParamService.setQueryParams({page: query.pageIndex, pageSize: query.pageSize});
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

