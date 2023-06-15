import {Injectable} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) {
  }

  getAllQueryParams(): Params {
    return this.route.snapshot.queryParams;
  }

  // не вижу нигде использование этого метода
  getQueryParam(param: string): string | null {
    return this.route.snapshot.queryParamMap.get(param);
  }

  setQueryParams(params: Params): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
