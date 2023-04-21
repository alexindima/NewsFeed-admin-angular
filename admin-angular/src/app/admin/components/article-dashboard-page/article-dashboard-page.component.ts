import {Component} from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {Article} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DashboardPageComponent} from "../dashboard-page/dashboard-page.component";

// уже видел в user dashboard, так нельзя, два источника одинаковой фичи
// далее весь фидбек будет в user-dashboard-page, здесь дублирование
// нельзя так, всё что общее выносится в отдельные классы

@Component({
  selector: 'app-article-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss']
})
export class ArticleDashboardPageComponent extends DashboardPageComponent<Article>{
  constructor(
    protected override _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected override _matDialog: MatDialog,
    protected override _service: ArticlesService
  ) {
    super(_activatedRoute, _router, _matDialog, _service);
  }

}
