import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {ArticlesService} from "../services/articles.service";
import {UsersService} from "../services/users.service";
import {User} from "../../interfaces";
import {CategoriesService} from "../services/categories.service";
import {TagsService} from "../services/tags.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    public categoriesService: CategoriesService,
    public tagsService: TagsService,
    private usersService: UsersService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.usersService.getSingleUser(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/admin', 'users'])
        return EMPTY
      })
    )
  }
}
