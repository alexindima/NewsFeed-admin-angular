import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {OperationResponse, Paginated} from "../entities/response.interface";
import {ArticleUserQueryPaginator} from "../entities/service.interface";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T>{
  constructor(
    private _http: HttpClient,
  ) {
  }

  getPaginatedItems(url: string, query: ArticleUserQueryPaginator): Observable<Paginated<T>> {
    /*
      Можно еще попробовать формировать параметры запроса с помощью HttpParams()
      то есть хорошо бы сюда приходил некий массив с параметрами и их значениями, а здесь формировался урл через HttpParams
      + так можно бы было объединить все get методы в один, типо:
       public restGET(endpoint: string, paramsData: IListItem[] = []): Observable<any> {
          let params = new HttpParams();

          paramsData.map((param: IListItem) => {
            if (param) {
              params = params.set(param.heading, param.value);
            }
          });

          const options = {
            params
          };

          return this._http.get<OperationResponse<T>>(endpoint, options).pipe(
              map(result => result.data)
          );
        }
        с таким методом пропадает необходимость в getAllItems(), getSingleItem(), getPaginatedItems()
        т к он один сделает все это, нужно только передать нужный урл и параметры, например
         интерфейс для параметров может выглядеть вот так:
         interface IListItem<T = any> {
            heading: string;
            value: T;
         }
         и допустим в ArticleService в методе getPaginatedItems() можно написать вот так и нужные параметры передать сразу оттуда
         const params: IListItem[] = [
            {
              heading: 'page',
              value: query.pageIndex
            },
            {
              heading: 'pageSize',
              value: query.pageSize
            }
         ];
         а в других методах только нужный эндпоинт формировать и сразу его передавать:
          getSingleItem(id: number): Observable<Article> {
              const endpoint = `${(ARTICLE_URL)}/${id}`;
              return this._baseHttpService.restGET(endpoint);
          }
    */
    let preparedUrl = `${url}?`;
    if (query.search) {
      preparedUrl += `q=${query.search.replace(/ /g, '+')}&`;
    }
    preparedUrl += `page=${query.pageIndex}&pageSize=${query.pageSize}`;
    return this._http.get<OperationResponse<Paginated<T>>>(preparedUrl).pipe(
      map(result => result.data)
    )
  }

  getAllItems(url: string): Observable<T[]> {
    return this._http.get<OperationResponse<T[]>>(url).pipe(
      map(response => response.data)
    )
  }

  getSingleItem(url: string, id: number): Observable<T> {
    return this._http.get<OperationResponse<T>>(`${(url)}/${id}`).pipe(
      map(response => response.data)
    );
  }
  createItem(url: string, item: T): Observable<T> {
    return this._http.post<OperationResponse<T>>(url, item).pipe(
      map(response => response.data)
    );
  }

  editItem(url: string, id: number, item: T): Observable<T> {
    return this._http.patch<OperationResponse<T>>(`${(url)}/${id}`, item).pipe(
      map(response => response.data)
    );
  }

  deleteItem(url: string, id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${(url)}/${id}`).pipe(
      map(response => response.success)
    );
  }
}
