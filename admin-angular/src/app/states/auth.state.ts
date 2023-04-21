import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private _data = new Subject<string>();
  error$: Observable<string> = this._data.asObservable();

  setError(error: string) {
    this._data.next(error);
  }
}
