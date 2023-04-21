import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, OperationResponse, Tag} from "../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {TagState} from "../states/tag.state";

const BASE_URL = 'http://localhost:8000/api/tags';

@Injectable({
  providedIn: 'root'
})
export class SharedTagService {
  constructor(
    private _http: HttpClient,
    private _tagState: TagState,
  ) {
  }

  updateItemsList(): Observable<OperationResponse<Tag[]>> {
    return this._http.get<OperationResponse<Tag[]>>(BASE_URL).pipe(
      tap(response => this._tagState.setItems(response.data))
    )
  }

  getTagsList(): Observable<Tag[]> {
    return this._http.get<OperationResponse<Tag[]>>(BASE_URL).pipe(
      map((response) => response.data)
    );
  }

  createTag(name: string): Observable<Tag> {
    return this._http.post<OperationResponse<Tag>>(BASE_URL, {name: name}).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.data)
        )
      })
    );
  }

  deleteTag(id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${BASE_URL}/${id}`).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.success)
        )
      })
    );
  }

}

