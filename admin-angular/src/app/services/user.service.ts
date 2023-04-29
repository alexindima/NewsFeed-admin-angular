import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {UserState} from "../states/user.state";
import {BaseArticleUserService} from "./base-article-user.service";

 const USER_URL = `/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseArticleUserService<User>{
  // лучше делать BASE_URL не в конструкторе, а через public override свойство, тогда не придётся конструкторы оверрайдить, будет меньше кода в твоих сервисах
  constructor(
    protected override _http: HttpClient,
    protected _userState: UserState,
  ) {
    super(_http, _userState, USER_URL);
  }
}

