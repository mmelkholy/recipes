import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipes/recipe.model';
import { HttpService } from './services/http.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = []
  /* [
    new Recipe(
      1,
      "Pasta Recipe",
    "This is the decription of the pasta recipe",
      "http://127.0.0.1/public/images/pasta.jpeg",
      [
        new Ingredient('1-0', 'Meat', 6),
        new Ingredient('1-1', 'Carrots', 12),
        new Ingredient('1-2', 'Rice', 0.3),
        new Ingredient('1-3', 'Cheese', 0.1)
      ]
    ),
    new Recipe(
      2,
      "Other Pasta",
    "I love Pasta as You can GUESS!",
      "http://127.0.0.1/public/images/pasta2.jpeg",
      [
        new Ingredient('2-0', 'Meat', 6),
        new Ingredient('2-1', 'Carrots', 12),
        new Ingredient('2-2', 'Rice', 0.3),
        new Ingredient('2-3', 'Cheese', 0.1)
      ]
    )
  ] */

  recipeListUpdated = new Subject<Recipe[]>()

  constructor(private httpSerrvice: HttpService) { }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes
    this.recipesListUpdated()
  }

  recipesListUpdated(): void {
    this.recipeListUpdated.next(this.recipes)
  }

  listRecipes(): Recipe[] {
    return this.recipes
  }

  getRecipeByName(recipeName: string): Recipe {
    return this.recipes.filter(recipe => recipe.name === recipeName)[0]
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.filter(recipe => recipe.id === id)[0]
  }

  updateRecipe(recipe: Recipe): void {
    const index: number = this.recipes.findIndex((item: Recipe) => item.id === recipe.id)
    this.recipes[index] = recipe
    this.recipesListUpdated()
    console.log(this.recipes)
  }

  addNewRecipe(recipe: Recipe): void {
    let newArray: Recipe[] = [...this.recipes]
    newArray.push(recipe)
    this.updateRecipes(newArray)
  }

  deleteRecipeById(id: number): void {
    this.recipes = this.recipes.filter((recipe: Recipe) => {
      return recipe.id !== id
    })
    this.updateRecipes(this.recipes)
  }

  fetchRecipeList() {
    this.httpSerrvice.getRecipes().pipe(tap(
      (recipes: Recipe[]) => this.recipes = recipes
    )).subscribe((recipes: Recipe[]) => {
      this.setRecipes(recipes)
    })
  }

  private updateRecipes(recipes: Recipe[]) {
    this.httpSerrvice.saveRecipes(recipes)
      .pipe(
        tap((res: Recipe[]) => {
          console.log(res)
          this.recipes = res
          this.recipesListUpdated()
        })
      )
  }
}
