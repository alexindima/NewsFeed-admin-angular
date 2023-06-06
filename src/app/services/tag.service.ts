import {Injectable} from "@angular/core";
import {Tag} from "../entities/category-tag.interface";
import {TagState} from "../states/tag.state";
import {Observable, tap} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {BaseHttpService} from "./base-http.service";
import {CategoryTagService} from "../entities/service.interface";

 const TAG_URL = '/api/tags';

@Injectable({
  providedIn: 'root'
})
export class TagService implements CategoryTagService<Tag>{
  constructor(
    private _baseHttpService: BaseHttpService<Tag>,
    private _tagState: TagState,
  ) {
  }

  updateItemsList(): Observable<Tag[]> {
    return this._baseHttpService.getAllItems(TAG_URL).pipe(
      tap((response) => this._tagState.setItems(response))
    )
  }

  createItem(name: string): Observable<Tag> {
    return this._baseHttpService.createItem(TAG_URL, {name: name} as Tag).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response)
        )
      })
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._baseHttpService.deleteItem(TAG_URL, id).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response)
        )
      })
    );
  }
}

