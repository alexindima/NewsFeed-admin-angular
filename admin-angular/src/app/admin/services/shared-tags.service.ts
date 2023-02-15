import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Subs} from "../utils/subs";

const BASE_URL = 'http://localhost:3030/tags';

@Injectable()
export class SharedTagsService implements OnDestroy {
  private _subs = new Subs();
  // для провайдеров, которые хранят данные, есть спец термин - State.
  // и обычно разделяют State и Service на отдельные файлы.
  // это делается намеренно, т.к. задачи таких файлов разные
  // сервис нужен чтобы работать с апи в твоём случае
  // стейт нужен чтобы эти данные хранить в каком-то общедоступном месте
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

    // сравни с моим код-стайлом, у кого чище?
    // return this._http.get<Tag[]>(BASE_URL).pipe(
    //   tap(data => this._data.next(data))
    // )
  }

  getTagsList(): Observable<Tag[]> {
    return this._http.get<Tag[]>(BASE_URL);
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

        // ого, офигенно, сам сделал? :)
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
        return of({id: '', name: ''} as unknown as Tag); // as unknown as Tag это хак, значит что-то пошло не так
      })
    );
  }

  // в принципе правильно сделал, но есть некоторое непонимание провайдеров.
  // текущий провайдер существует в единственном экземпляре на всё приложение,
  // (ну в твоём случае пока нет, надо добавить providerInRoot)
  // т.к. нам не нужен второй такой сервис с запросами по тегам
  // получается и разрушать ничего не надо, т.к. приложение пока живёт и провайдер живёт, отписка лишняя
  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

