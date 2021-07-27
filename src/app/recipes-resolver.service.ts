import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';

import { HttpService } from './services/http.service';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private http: HttpService,
    private recipes: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.recipes.listRecipes().length) return this.http.getRecipes()
      .pipe(
        tap((recipes: Recipe[]) => {
          this.recipes.setRecipes(recipes)
        })
      )
  }
}
