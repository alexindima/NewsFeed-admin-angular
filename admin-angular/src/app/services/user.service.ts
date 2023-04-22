import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {UserState} from "../states/user.state";
import {BaseArticleUserService} from "./base-article-user.service";

// я сча по проекту нашёл копипасту localhost:3030
// а на занятиях я говорил про proxy conf файл,
// погугли и пусть все апи пути будут без хоста и порта, здесь это /users
const BASE_URL = `http://localhost:8000/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseArticleUserService<User>{

  constructor(
    protected override _http: HttpClient,
    protected _userState: UserState,
  ) {
    super(_http, _userState, BASE_URL);
  }
}

