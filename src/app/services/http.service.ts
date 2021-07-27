import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getRecipes() {
    return this.http.get<Recipe[]>('https://new-ng-http-c4236-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        })
      )
  }

  saveRecipes(recipeList: Recipe[]): Observable<Recipe[]> {
    return this.http.put('https://new-ng-http-c4236-default-rtdb.firebaseio.com/recipes.json', recipeList) as Observable<Recipe[]>
  }

  deleteRecipes(){
    return this.http.delete('https://new-ng-http-c4236-default-rtdb.firebaseio.com/recipes.json').subscribe(result => console.log(result))
  }


}
