import { AssertNotNull } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredients: Ingredient[] = []
  currentIngredientIndex: number

  ingredientListChanged = new Subject<Ingredient[]>()
  startEditing = new Subject<number>()

  constructor() { }

  listIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addNewIngredient(ingredient: Ingredient): void {
    let index = this.ingredients.findIndex(ing => ing.id === ingredient.id)
    console.log(index)
    if (index >= 0 && this.ingredients[index].name === ingredient.name) {
      this.ingredients[index].amount += ingredient.amount
    } else {
      this.ingredients.push(ingredient)
    }
    this.ingredientListChanged.next()
  }

  modifyIngredientByIndex(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient
  }

  removeIngredientByIndex(index: number): void {
    this.ingredients.splice(index, 1)
    this.ingredientListChanged.next()
  }

  getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index]
  }

  editIngredient(index: number): void {
    this.currentIngredientIndex = index
    this.startEditing.next(index)
  }

  doneEditing(): void {
    this.currentIngredientIndex = null
    this.startEditing.next(null)
  }

}
