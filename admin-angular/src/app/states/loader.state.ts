import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderState {
  private interceptCount = 0;
  private _data = new Subject<number>();
  intercepts$: Observable<number> = this._data.asObservable();

  increaseCount() {
    this.interceptCount++;
    this._data.next(this.interceptCount);
  }

  decreaseCount() {
    this.interceptCount--;
    this._data.next(this.interceptCount);
  }
}
