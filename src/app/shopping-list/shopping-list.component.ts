import { Subscription } from 'rxjs';
import { IngredientService } from './../ingredient.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientList: Ingredient[]
  ingredientListSubscription: Subscription

  constructor(private ingredients: IngredientService) {
    this.ingredientListSubscription = this.ingredients.ingredientListChanged.subscribe(() => this.ingredientList = this.ingredients.listIngredients())
  }

  ngOnInit(): void {
    this.ingredientList = this.ingredients.listIngredients()
  }

  ngOnDestroy(): void {
    this.ingredientListSubscription.unsubscribe()
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.addNewIngredient(ingredient)
  }

}
