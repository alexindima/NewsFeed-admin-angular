import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../interfaces";
import {Observable} from "rxjs";

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3030/categories`)
  }

  createCategory(name: string): Observable<Category> {
    return new Observable(observer => {
      this.getCategoriesList().subscribe((categories: Category[]) => {
        const isCategoryExist = categories.some((category: Category) => category.name.toLowerCase() === name.toLowerCase())
        if (isCategoryExist) {
          const foundCategory = categories.find((category: Category) => category.name.toLowerCase() === name.toLowerCase())
          observer.next(foundCategory);
          observer.complete();
        } else {
          this.http.post<Category>(`http://localhost:3030/categories`, {name: name}).subscribe((result: Category) => {
            observer.next(result);
            observer.complete();
          })
        }
      })
    });
  }

  deleteCategory(category: number | string | Category) {
    if (typeof category === "number") {
      this.http.delete(`http://localhost:3030/categories/${category}`).subscribe()
    }
    if (typeof category === "string") {
      this.getCategoriesList().subscribe((categories: Category[]) => {
        const isCategoryExist = categories.some((singleCategory: Category) => singleCategory.name.toLowerCase() === category.toLowerCase())
        if (isCategoryExist) {
          const foundCategory = categories.find((singleCategory: Category) => singleCategory.name.toLowerCase() === category.toLowerCase())
          this.http.delete(`http://localhost:3030/categories/${foundCategory!.id}`).subscribe()
        }
      })
    }
    if (typeof category === "object") {
      this.http.delete(`http://localhost:3030/categories/${category.id}`).subscribe()
    }
  }
}

