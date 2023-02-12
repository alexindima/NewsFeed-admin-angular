import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Subs} from "../utils/subs";

const BASE_URL = 'http://localhost:3030/tags';

@Injectable()
export class SharedTagsService implements OnDestroy {
  private _subs = new Subs();
  private _data = new BehaviorSubject<Tag[]>([]);
  tags: Observable<Tag[]> = this._data.asObservable();

  constructor(
    private _http: HttpClient) {
  }

  updateTagsList(): Observable<Tag[]> {
    return this._http.get<Tag[]>(BASE_URL).pipe(
      tap(data => {
      this._data.next(data);
    }))
  }

  getTagsList(): Observable<Tag[]> {
    return this._http.get<Tag[]>(BASE_URL);
  }

  createTag(name: string): Observable<Tag> {
    return this.getTagsList().pipe(
      switchMap((tags: Tag[]) => {
        const tagExist = tags.find((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase());
        if (tagExist) {
          return of(tagExist);
        }

        return this._http.post<Tag>(BASE_URL, {name: name}).pipe(
          switchMap((tag: Tag) => {
            return this.updateTagsList().pipe(
              map(() => tag)
            )
          })
        );
      })
    );
  }

  deleteTag(tag: number | string | Tag): Observable<Tag> {
    const deleteTagById = (id: number): Observable<Tag> => {
      return this._http.delete<Tag>(`${BASE_URL}/${id}`).pipe(
        switchMap((tag: Tag) => {
          return this.updateTagsList().pipe(
            map(() => tag)
          )
        })
      );
    }
    if (typeof tag === "number") {
      return deleteTagById(tag);
    }

    if (typeof tag === "object") {
      return deleteTagById(tag.id);
    }

    return this.getTagsList().pipe(
      switchMap((tags: Tag[]) => {
        const tagExist = tags.find((singleTag: Tag) => singleTag.name.toLowerCase() === tag.toLowerCase());
        if (tagExist) {
          return deleteTagById(tagExist.id);
        }
        return of({id: '', name: ''} as unknown as Tag);
      })
    );
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

