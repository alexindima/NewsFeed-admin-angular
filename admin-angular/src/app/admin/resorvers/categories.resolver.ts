import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CategoriesService} from "../services/categories.service";
import {Category} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(public categoriesService: CategoriesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoriesService.getCategoriesList();
  }
}
