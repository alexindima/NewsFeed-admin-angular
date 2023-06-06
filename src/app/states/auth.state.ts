import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  error$: Subject<string> = new Subject<string>();

  setError(error: string) {
    this.error$.next(error);
  }
}
