import {Component, OnInit} from '@angular/core';
import {Category, Tag, User} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SharedTagsService} from "../../services/shared-tags.service";
import {SharedCategoriesService} from "../../services/shared-categories.service";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";
import {ArticlesService} from "../../services/articles.service";

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
    protected override _service: ArticlesService,
    private _sharedCategoriesService: SharedCategoriesService,
    private _sharedTagsService: SharedTagsService,
  ) {
  super(_activatedRoute, _router, _matDialog, _service);
  }

  override ngOnInit(): void {
    this._subs.add = this._sharedCategoriesService.categories.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._sharedTagsService.tags.subscribe((data) => {
      this.tagsList = data;
    })
    super.ngOnInit();
  }

}

