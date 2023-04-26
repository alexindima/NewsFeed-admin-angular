import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  // много кода ненужного, достаточно сразу одну переменную и в неё писать, на фронте это оверинжиниринг

  private _data = new Subject<string>();
  error$: Observable<string> = this._data.asObservable();

  setError(error: string) {
    this._data.next(error);
  }
}
