import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "Pasta Recipe",
    "This is the decription of the pasta recipe",
      "http://127.0.0.1/public/images/pasta.jpeg",
      [
        new Ingredient('Meat', 6),
        new Ingredient('Carrots', 12),
        new Ingredient('Rice', 0.3),
        new Ingredient('Cheese', 0.1)
      ]
    ),
    new Recipe(
      "Other Pasta",
    "I love Pasta as You can GUESS!",
      "http://127.0.0.1/public/images/pasta2.jpeg",
      [
        new Ingredient('Meat', 6),
        new Ingredient('Carrots', 12),
        new Ingredient('Rice', 0.3),
        new Ingredient('Cheese', 0.1)
      ]
    )
  ]

  private clickedRecipe: Recipe
  changeSelectedRecipe = new EventEmitter<Recipe>()


  constructor() { }

  listRecipes(): Recipe[] {
    return this.recipes
  }

  getRecipeByName(recipeName: string): Recipe {
    return this.recipes.filter(recipe => recipe.name === recipeName)[0]
  }

  setClickedRecipe(recipe: Recipe) {
    if (this.clickedRecipe !== recipe) {
      this.clickedRecipe = recipe
      this.changeSelectedRecipe.emit(this.clickedRecipe)
    }
  }

  getSelectedRecipe(): Recipe {
    return this.clickedRecipe
  }

}
