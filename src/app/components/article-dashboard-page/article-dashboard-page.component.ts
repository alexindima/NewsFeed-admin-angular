import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ArticleState} from "../../states/article.state";
import {Article} from "../../entities/article.interface";
import {DeleteArticleModalComponent} from "../delete-article-modal/delete-article-modal.component";
import {DashboardPaginatorService} from "../../services/dashboard-paginator.service";
import {ArticleUserQueryPaginator} from "../../entities/service.interface";
import {Subs} from "../../utils/subs";
import {PaginatorSettings} from "../../entities/paginator.interface";
import {QueryParamService} from "../../services/query-param.service";

@Component({
  selector: 'app-article-base-dashboard-page',
  templateUrl: './article-dashboard-page.component.html',
  styleUrls: ['./article-dashboard-page.component.scss'],
  providers: [
    DashboardPaginatorService,
  ]
})
export class ArticleDashboardPageComponent implements OnInit, OnDestroy{
  // Лучше сначала объявить публичные свойства, а потом приватные
  // + будет легче читаться, если ставить пустую строку после каждого свойства
  // >> вторая вещь - удобная, если много работать с кодовой базой и рефакторить, но не принципиально
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'category', 'mainTitle', 'tags', 'actions'];
  private _subs = new Subs();
  itemsList: Article[] = [];
  paginatorSettings!: PaginatorSettings;
  constructor(
    // тоже самое сначала публичные, потом приватные, легче будет читаться
    private _articleService: ArticleService,
    private _articleState: ArticleState,
    public dashboardPaginatorService: DashboardPaginatorService,
    private _queryParamService: QueryParamService,
    public deleteArticleModal: DeleteArticleModalComponent,
  ) {
  }

  ngOnInit(): void {
    /*
      В этом компоненте я вижу практически полное дублирование кода
      из UserDashboardPageComponent, в таком случае лучше сделать
      абстрактный класс DashboardComponent<T> и все общее вынести в него
      а в качестве дженерика передавать нужный тип (User или Article в твоем случае),
      так получится, что здесь ты только сделаешь оверайд loadItems(), добавишь одну подписку для _articleState и
      сделаешь оверайд метода deleteItems(), а все остальное будет в базовом классе

      >> да, норм предложение, ещё почти всегда вместо базовых классов можно выносить в отдельные мелкие фичи отдельными компонентами
       насколько это возможно, чем создавать монструозные компоненты
    */
    const urlQueryParams = this._queryParamService.getAllQueryParams();
    // вместо +, используй функцию coerceNumberProperty() из cdk, иначе если в свойство придет undefined, то получим NaN
    const pageIndex: number | null = +urlQueryParams['page'] - 1;
    const pageSize: number | null = +urlQueryParams['pageSize'];
    this.dashboardPaginatorService.setData(pageIndex, pageSize);

    this._subs.add = this.deleteArticleModal.needToUpdate$.subscribe(() => this.loadItem({
      pageIndex: this.paginatorSettings.pageIndex + 1,
      pageSize: this.paginatorSettings.pageSize
    }))
    this._subs.add = this._articleState.count$.subscribe((count) => {
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

  // лучше loadItems(), здесь же все-таки массив приходит, а не один элемент
  loadItem(query: ArticleUserQueryPaginator) {
    this._subs.add = this._articleService.getPaginatedItems(query).subscribe((result: Article[]) => {
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
