import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../../interfaces";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {Subs} from "../utils/subs";

const BASE_URL = 'http://localhost:3030/tags';

@Injectable()
export class SharedTagsService implements OnDestroy {
  private _subs = new Subs();
  private _data = new BehaviorSubject<Tag[]>([]);
  tags: Observable<Tag[]> = this._data.asObservable();

  constructor(private _http: HttpClient) {
  }

  updateTagsList() {
    this._subs.add = this._http.get<Tag[]>(BASE_URL).subscribe(data => {
      this._data.next(data);
    })
  }

  getTagsList(): Observable<Tag[]> {
    return this._http.get<Tag[]>(BASE_URL);
  }

  createTag(name: string): Observable<Tag> {
    return this.getTagsList().pipe(
      switchMap((tags: Tag[]) => {
        const isTagExist = tags.some((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase());
        if (isTagExist) {
          return of(tags.find((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase()));
        }
        return this._http.post<Tag>(BASE_URL, {name: name}).pipe(
          tap(() => {
            this.updateTagsList();
          }),
          catchError(error => of(error))
        );
      })
    );
  }

  deleteTag(tag: number | string | Tag): Observable<Tag> {
    if (typeof tag === "number") {
      return this._http.delete<Tag>(`${BASE_URL}/${tag}`);
    }

    if (typeof tag === "object") {
      return this._http.delete<Tag>(`${BASE_URL}/${tag.id}`).pipe(
        tap(() => {
          this.updateTagsList();
        }),
        catchError(error => of(error))
      );
    }

    return this.getTagsList().pipe(
      switchMap((tags: Tag[]) => {
        const isTagExist = tags.some((singleTag: Tag) => singleTag.name.toLowerCase() === tag.toLowerCase());
        if (isTagExist) {
          const foundTag = tags.find((singleTag: Tag) => singleTag.name.toLowerCase() === tag.toLowerCase());
          return this._http.delete<Tag>(`${BASE_URL}/${foundTag!.id}`).pipe(
            tap(() => {
              this.updateTagsList();
            }),
            catchError(error => of(error))
          );
        }
        return of({id: '', name: ''} as unknown as Tag);
      })
    );
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

