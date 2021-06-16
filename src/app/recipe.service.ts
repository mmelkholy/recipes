import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
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
  ]

  recipeListUpdated = new Subject<Recipe[]>()


  constructor() { }

  recipesListUpdates() {
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

  updateRecipe(recipe: Recipe) {
    const index: number = this.recipes.findIndex((item: Recipe) => item.id === recipe.id)
    this.recipes[index] = recipe
    this.recipesListUpdates()
    console.log(this.recipes)
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesListUpdates()
  }

  deleteRecipeById(id: number) {
    this.recipes = this.recipes.filter((recipe: Recipe) => {
      return recipe.id !== id
    })
    console.log(this.recipes)
    this.recipesListUpdates()
  }
}
