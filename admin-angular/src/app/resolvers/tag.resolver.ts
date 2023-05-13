import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {TagService} from "../services/tag.service";
import {Observable} from "rxjs";
import {Tag} from "../entities/category-tag.interface";

@Injectable({
  providedIn: 'root'
})
export class TagResolver {
  constructor(
    private _tagsService: TagService,
  ) {
  }

  // отсутствует обработка ошибки!
  // this._router.navigate(ROUTE_TO_REDIRECT);
  // вообще твои резолверы очень похожи и их исход очень похож, стоит объединять фичи, например catchError с редиректом в отдельную фичу можно вынести целиком
  // Ещё при резолверах нужно не убирать верхнюю навигацию под лоадером - это мешает UX изменить выбор уйти со вкладки до загрузки страницы
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
    return this._tagsService.updateItemsList();
  }
}
