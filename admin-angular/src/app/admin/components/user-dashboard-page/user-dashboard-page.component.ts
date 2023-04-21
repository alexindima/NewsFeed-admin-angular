import {Component, OnInit} from '@angular/core';
import {Category, Tag, User} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SharedTagService} from "../../../services/shared-tag.service";
import {SharedCategoryService} from "../../../services/shared-category.service";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";
import {ArticleService} from "../../../services/article.service";
import {UserService} from "../../../services/user.service";
import {UserState} from "../../../states/user.state";
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";

@Component({
  selector: 'app-user-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent extends DashboardPageComponent<User> implements OnInit {
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected override _service: UserService,
    protected override _state: UserState,
    private _categoryState: CategoryState,
    private _tagState: TagState,
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

}

