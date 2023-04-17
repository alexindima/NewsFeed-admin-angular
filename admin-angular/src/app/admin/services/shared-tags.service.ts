import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OperationResponse, Tag} from "../../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";

const BASE_URL = 'http://localhost:8000/api/tags';

@Injectable({
  providedIn: 'root'
})
export class SharedTagsService{
  // для провайдеров, которые хранят данные, есть спец термин - State.
  // и обычно разделяют State и Service на отдельные файлы.
  // это делается намеренно, т.к. задачи таких файлов разные
  // сервис нужен чтобы работать с апи в твоём случае
  // стейт нужен чтобы эти данные хранить в каком-то общедоступном месте
  private _data = new BehaviorSubject<Tag[]>([]);
  tags: Observable<Tag[]> = this._data.asObservable();

  constructor(
    private _http: HttpClient
  ) {
  }

  updateTagsList(): Observable<OperationResponse<Tag[]>> {
    return this._http.get<OperationResponse<Tag[]>>(BASE_URL).pipe(
      tap(response => this._data.next(response.data))
    )
  }

  getTagsList(): Observable<Tag[]> {
    return this._http.get<OperationResponse<Tag[]>>(BASE_URL).pipe(
      map((response) => response.data)
    );
  }

  // name.toLowerCase() встречается во многих местах, вообще функция предиката у тебя дублируется по проекту,
  // стало быть её точно надо вынести отдельно или прям чтобы зависимые компоненты всегда возвращали lower case,
  // тогда не придётся везде эту проверку вставлять
  createTag(name: string): Observable<Tag> {
    return this.getTagsList().pipe(
      switchMap((tags: Tag[]) => {
        const tagExist = tags.find((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase());
        if (tagExist) {
          return of(tagExist);
        }

        return this._http.post<OperationResponse<Tag>>(BASE_URL, {name: name}).pipe(
          switchMap(response => {
            return this.updateTagsList().pipe(
              map(() => response.data)
            )
          })
        );
      })
    );
  }

  deleteTag(tag: number): Observable<boolean> {
    const deleteTagById = (id: number): Observable<boolean> => {
      return this._http.delete<OperationResponse<null>>(`${BASE_URL}/${id}`).pipe(
        switchMap(response => {
          return this.updateTagsList().pipe(
            map(() => response.success)
          )
        })
      );
    }

    return deleteTagById(tag);
  }
}

