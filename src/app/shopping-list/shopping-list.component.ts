import { IngredientService } from './../ingredient.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientList: Ingredient[]

  constructor(private ingredients: IngredientService) {
    this.ingredients.ingredientListChanged.subscribe(() => this.ingredientList = this.ingredients.listIngredients())
  }

  ngOnInit(): void {
    this.ingredientList = this.ingredients.listIngredients()
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.addNewIngredient(ingredient)
  }

}
