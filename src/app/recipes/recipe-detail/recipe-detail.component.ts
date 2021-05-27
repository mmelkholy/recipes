import { IngredientService } from './../../ingredient.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe

  constructor(private recipes: RecipeService, private ingredients: IngredientService) {
    this.recipes.changeSelectedRecipe.subscribe((recipe) => this.currentRecipe = recipe)
  }

  ngOnInit(): void {
    this.currentRecipe = this.recipes.getSelectedRecipe()
  }

  addCurrentIngredients(): void {
    console.log(this.currentRecipe.ingredients)
    for (let ingredient of this.currentRecipe.ingredients) {
      this.ingredients.addNewIngredient(ingredient)
    }
  }

}
