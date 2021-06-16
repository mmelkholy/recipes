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
  editingIndex: number
  ingredientListSubscription: Subscription
  ingredientEditSubscription: Subscription

  constructor(private ingredients: IngredientService) {}

  ngOnInit(): void {
    this.ingredientList = this.ingredients.listIngredients()

    this.ingredientListSubscription = this.ingredients.ingredientListChanged.subscribe(() => this.ingredientList = this.ingredients.listIngredients())

    this.ingredientEditSubscription = this.ingredients.startEditing.subscribe((index: number) => {
      this.editingIndex = index
    })
  }

  ngOnDestroy(): void {
    this.ingredientListSubscription.unsubscribe()
    this.ingredientEditSubscription.unsubscribe()
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.addNewIngredient(ingredient)
  }

  startEditing(index: number) {
    this.ingredients.editIngredient(index)
  }

}
