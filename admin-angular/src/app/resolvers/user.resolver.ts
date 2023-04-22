import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {User} from "../interfaces";
import {BaseArticleUserResolver} from "./base-article-user.resolver";

const ROUTE_TO_REDIRECT = ['/admin', 'users'];

@Injectable({
  providedIn: 'root'
})
export class UserResolver extends BaseArticleUserResolver<User>{
  constructor(
    protected _userService: UserService,
    protected override _router: Router
  ) {
    super(_userService, _router, ROUTE_TO_REDIRECT)
  }
}
