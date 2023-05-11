import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Tag} from "../../../entities/category-tag.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BaseDashboardPageComponent} from "../base-dashboard-page/base-dashboard-page.component";
import {UserService} from "../../../services/user.service";
import {UserState} from "../../../states/user.state";
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";
import {MatTable} from "@angular/material/table";
import {User} from "../../../entities/user.interface";
import {Article} from "../../../entities/article.interface";

@Component({
  selector: 'app-user-base-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent extends BaseDashboardPageComponent<User> implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['userId', 'role', 'createdAt', 'name', 'email', 'categories', 'tags', 'actions'];
  @ViewChild(MatTable) table!: MatTable<Article>;
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected override _service: UserService,
    protected override _state: UserState,
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
  ) {
  super(_activatedRoute, _router, _matDialog, _service, _state);
  }

  override ngOnInit(): void {
    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._tagState.items$.subscribe((data) => {
      this.tagsList = data;
    })
    super.ngOnInit();
  }

  onWindowResize = () => {
    this.table.updateStickyColumnStyles();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.onWindowResize);
  }

  override ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    super.ngOnDestroy();
  }

}

