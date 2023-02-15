import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

// не вникал сильно, работает, не трогай
// но может разберусь как нибудь есть ли профит, пока влом
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private interceptCount = 0;
  private interceptCountSubject = new Subject<number>();

  interceptCount$ = this.interceptCountSubject.asObservable();

  getInterceptCount(): Observable<number> {
    return this.interceptCount$;
  }

  incrementInterceptCount() {
    this.interceptCount++;
    this.interceptCountSubject.next(this.interceptCount);
  }

  decrementInterceptCount() {
    this.interceptCount--;
    this.interceptCountSubject.next(this.interceptCount);
  }

  resetInterceptCount() {
    this.interceptCount = 0;
    this.interceptCountSubject.next(this.interceptCount);
  }
}
