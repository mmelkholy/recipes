import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredients: Ingredient[] = []

  ingredientListChanged = new Subject<Ingredient[]>()

  constructor() { }

  listIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addNewIngredient(ingredient: Ingredient): void {
    let index = this.ingredients.findIndex(ing => ing.id === ingredient.id)
    console.log(index)
    if (index >= 0) {
      this.ingredients[index].amount += ingredient.amount
    } else {
      this.ingredients.push(ingredient)
    }
    this.ingredientListChanged.next()
  }

}
